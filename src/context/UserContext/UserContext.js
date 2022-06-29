import React, {useEffect} from "react"
import { isExpired, decodeToken } from "react-jwt";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
  getFirestore,
  serverTimestamp,
  documentId
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL} from 'firebase/storage'

const UserContext = React.createContext();
const {Provider} = UserContext

const UserProvider = ({children}) => {

  // if the cart is in the localStorage use it, if not initialize it
  const initialState = JSON.parse(localStorage.getItem("user")) || null;

  const [user, setUser] = React.useState(initialState)
  const [wishList, setWishList] = React.useState([])


  // every time that the cart it's modified we store their value in the localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if(user && wishList.length === 0){
      getStoredUserWishList(user.decodedJWT.email).then(
        userWishList => {
          localStorage.setItem("wishlist", userWishList);
          setWishList(userWishList);    
        }  
      )
     
    } 
  }, [user]);
  

  const getPictureUrl = async (name) => {
    const storage = getStorage();
    const reference = ref(storage, name);
    return await getDownloadURL(reference).then( res => { 
      console.log(`res: ${res}`);
      return res; 
    }).catch(err => console.log(`My error: ${JSON.stringify(err)}`));

  }

  const getStoredUserWishList = async (email) => {
    const db = getFirestore();
    const wishlistRef = collection(db, "wishlist");

    const storedWishListSnap = doc(wishlistRef,  user.decodedJWT.email);

    const wishListSnap = await getDoc(storedWishListSnap);

    if (wishListSnap.exists()) {
      const storedWishList = wishListSnap.data();
      const q = query(collection(db, "products"), where(documentId(), "in", storedWishList.items));
      const querySnapshot = await getDocs(q);
      let resultPromise = [];
      querySnapshot.forEach((doc) => {
        if(doc.exists()){  
          resultPromise.push(getPictureUrl(doc.data().pictureUrl).then( 
            url => ({id: doc.id, ...doc.data(), pictureUrl: url}) ) )
            
          }  
        }
      );
      return Promise.all(resultPromise);
    }
    return [];
  }
  const updateWishList = (newWishList) => {
    const db = getFirestore();
    const wishlistRef = collection(db, "wishlist");
    setWishList(newWishList);
    const wishListItemsToStore = newWishList.map( item => item.id )

    setDoc(doc(wishlistRef,  user.decodedJWT.email), {
      items: wishListItemsToStore, date: serverTimestamp() });
  }

  const login = (jwt) => {
      if(!isExpired(jwt)){
        setUser({
            jwt, decodedJWT: decodeToken(jwt) 
        })
      } else {
        throw new Error('JWT is expired')
      }
    
  }
  const logout = () => {
    setUser(null)
  }

  const addToWishList  = (item) => {
      const newWishList = [item, ...wishList];
      updateWishList(newWishList);
      //Save into db wishlist (user email, item id)
  }
 
  const removeFromWishList = (item) => {
      // Remove from wishlist
      let newWishList = [];
      wishList.forEach( wishItem => {
        if(item.id !== wishItem.id){
            newWishList.push(wishItem);
        }
      })
      updateWishList(newWishList);
  }

  const isItemOnWishList = (item) => {
    for(let i = 0; i < wishList.length; i++){
        if(item.id === wishList[i].id){
            return true;
          }  
    }
    return false;
}

  return (
    <Provider value={{
      login,
      logout,
      user,
      addToWishList,
      removeFromWishList,
      wishList,
      isItemOnWishList
    }}>{children}</Provider>
  )
}

export {UserContext, UserProvider}
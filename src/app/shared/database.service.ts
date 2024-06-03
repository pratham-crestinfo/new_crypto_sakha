import { Injectable } from "@angular/core";
import { Firestore, doc, updateDoc, arrayUnion,DocumentSnapshot,getDoc  } from '@angular/fire/firestore';


@Injectable()
export class DataBaseServie{
     constructor(private firestore: Firestore) {}
     addCoinId(uid:string,coinid:string){
          const docRef = doc(this.firestore, "cryto_sakha", "coin_id");
          updateDoc(docRef, {[uid]: arrayUnion(coinid)})
     }
     async getcoind(uid:string){
          const docRef = doc(this.firestore, "cryto_sakha", "coin_id");
          const docSnap: DocumentSnapshot<any> = await getDoc(docRef);
          if (docSnap.exists()) {
               console.log(docSnap.get(uid))
               return docSnap.get(uid)
             } else {
               return null; 
             }
     }
   
}
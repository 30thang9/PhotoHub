import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, remove, push, get, child, runTransaction } from "firebase/database";
import { environment } from 'src/app/environments/environment';
import { Deces } from 'src/app/models/deces.model';

@Injectable({
  providedIn: 'root'
})
export class Deces1Service {

  getDeces(): Promise<Deces[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'deces/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const reviews = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const reviewData = data[key];
            const review: Deces = {
              id: reviewData.id,
              partner_id: reviewData.partner_id,
              category: reviewData.category
            };

            reviews.push(review);
          }
        }

        resolve(reviews);
      });
    });
  }

  async getDecesByPartnerId(id: number): Promise<Deces | null> {
    try {
      const userInfos = await this.getDeces();
      const userInfo = userInfos.find((user) => user.partner_id === id);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  async getDecesById(id: number): Promise<Deces | null> {
    try {
      const userInfos = await this.getDeces();
      const userInfo = userInfos.find((user) => user.id === id);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  async createDeces(reviewData: Deces): Promise<Deces | null> {
    try {

      const isUnique = await this.isPartnerUnique(reviewData.partner_id);

      if (!isUnique) {
        console.log('The order is not unique');
        return null;
      }

      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const newUserId = await this.generateNewId();
      const newUserRef = ref(db, 'deces/' + newUserId);

      const newReview = {
        id: newUserId,
        partner_id: reviewData.partner_id,
        category: reviewData.category
      };

      await set(newUserRef, newReview);
      return newReview;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async updateDeces(updatedUser: Deces): Promise<Deces | null> {
    try {
      const userInfos = await this.getDecesById(updatedUser.id);

      if (userInfos === null) {
        console.error('User information not found for ID:', updatedUser.id);
        return null;
      }
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);

      const up = {
        id: updatedUser.id,
        partner_id: updatedUser.partner_id,
        category: updatedUser.category
      };

      const userInfoRef = ref(db, `deces/${updatedUser.id}`);
      await set(userInfoRef, up);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async generateNewId(): Promise<number> {
    const users = await this.getDeces();
    const maxId = users.length === 0 ? 0 : Math.max(...users.map((user) => user.id));
    return maxId + 1;
  }

  async isPartnerUnique(partner_id: number): Promise<boolean> {
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const usersRef = ref(db, 'deces');

    const snapshot = await get(usersRef);
    const data = snapshot.val();

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].partner_id === partner_id) {
            return false;
          }
        }
      }
    }
    return true;
  }

}

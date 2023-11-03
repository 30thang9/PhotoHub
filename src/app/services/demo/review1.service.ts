import { Injectable } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, remove, push, get, child, runTransaction } from "firebase/database";
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Review1Service {

  
  getReviews(): Promise<Review[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'reviews/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const reviews = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const reviewData = data[key];
            const review: Review = {
              id: reviewData.id,
              partner_id: reviewData.partner_id,
              rate: reviewData.rate || '',
              description: reviewData.description || '',
              order_id: reviewData.order_id
            };

            reviews.push(review);
          }
        }

        resolve(reviews);
      });
    });
  }

  async getReviewByPartnerId(id: number): Promise<Review | null> {
    try {
      const userInfos = await this.getReviews();
      const userInfo = userInfos.find((user) => user.partner_id === id);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  async getReviewById(id: number): Promise<Review | null> {
    try {
      const userInfos = await this.getReviews();
      const userInfo = userInfos.find((user) => user.id === id);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  async createReview(reviewData: Review): Promise<Review | null> {
    try {

      const isUnique = await this.isOderUnique(reviewData.order_id);

      if (!isUnique) {
        console.log('The order is not unique');
        return null;
      }

      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const newUserId = await this.generateNewId();
      const newUserRef = ref(db, 'reviews/' + newUserId);

      const newReview = {
        id: newUserId,
        partner_id: reviewData.partner_id,
        rate: reviewData.rate,
        description: reviewData.description,
        order_id: reviewData.order_id
      };

      await set(newUserRef, newReview);
      return newReview;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async updateUser(updatedUser: Review): Promise<Review | null> {
    try {
      const userInfos = await this.getReviewById(updatedUser.id);

      if (userInfos === null) {
        console.error('User information not found for ID:', updatedUser.id);
        return null;
      }
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);

      const up = {
        id: updatedUser.id,
        partner_id: updatedUser.partner_id,
        rate: updatedUser.rate,
        description: updatedUser.description,
        order_id: updatedUser.order_id
      };

      const userInfoRef = ref(db, `reviews/${updatedUser.id}`);
      await set(userInfoRef, up);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async generateNewId(): Promise<number> {
    const users = await this.getReviews();
    const maxId = users.length === 0 ? 0 : Math.max(...users.map((user) => user.id));
    return maxId + 1;
  }

  async isOderUnique(orderId: number): Promise<boolean> {
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const usersRef = ref(db, 'reviews');

    const snapshot = await get(usersRef);
    const data = snapshot.val();

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].order_id === orderId) {
            return false;
          }
        }
      }
    }
    return true;
  }

}

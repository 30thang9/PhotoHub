import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/models/userInfo.model';
import { getDatabase, onValue, ref, set, remove, push, get, child, runTransaction } from "firebase/database";
import { environment } from 'src/app/environments/environment';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserInfo1Service {

  getUserInfos(): Promise<UserInfo[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'user_info/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const userInfos = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const userInfoData = data[key];
            const userInfo: UserInfo = {
              id: userInfoData.id,
              user_id: userInfoData.user_id,
              img1: userInfoData.img1 || '',
              img2: userInfoData.img2 || '',
              img3: userInfoData.img3 || '',
              cost: userInfoData.cost || 0,
              description: userInfoData.description || '',
              prize: userInfoData.prize || '',
              interest: userInfoData.interest || '',
              language: userInfoData.language || '',
              camera: userInfoData.camera || '',
              portfolio: userInfoData.portfolio || [],
              typeOfPhoto: userInfoData.typeOfPhoto || [],
            };

            userInfos.push(userInfo);
          }
        }

        resolve(userInfos); // Trả về danh sách người dùng khi hoàn thành
      });
    });
  }

  async getUserInfoById(id: number): Promise<UserInfo | null> {
    try {
      const userInfos = await this.getUserInfos();
      const userInfo = userInfos.find((info) => info.id === id);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user info by ID:', error);
      return null;
    }
  }


  async createUserInfo(userInfoData: UserInfo): Promise<UserInfo | null> {
    try {

      const isUnique = await this.isUserIdUnique(userInfoData.user_id);

      if (!isUnique) {
        console.log('The id is not unique');
        return null;
      }

      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const newUserId = await this.generateNewId();
      const newUserRef = ref(db, 'user_info/' + newUserId);

      const newUser = {
        id: newUserId,
        user_id: userInfoData.user_id,
        img1: userInfoData.img1 || '',
        img2: userInfoData.img2 || '',
        img3: userInfoData.img3 || '',
        cost: userInfoData.cost || 0,
        description: userInfoData.description || '',
        prize: userInfoData.prize || '',
        interest: userInfoData.interest || '',
        language: userInfoData.language || '',
        camera: userInfoData.camera || '',
        portfolio: userInfoData.portfolio || [],
        typeOfPhoto: userInfoData.typeOfPhoto || [],
      };

      await set(newUserRef, newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async updateUserInfo(updatedUserInfo: UserInfo): Promise<UserInfo | null> {
    try {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const userInfos = await this.getUserInfoById(updatedUserInfo.id);

      if (userInfos === null) {
        console.error('User information not found for ID:', updatedUserInfo.id);
        return null;
      }

      const updatedUser = {
        id: updatedUserInfo.id,
        user_id: updatedUserInfo.user_id,
        img1: updatedUserInfo.img1 || '',
        img2: updatedUserInfo.img2 || '',
        img3: updatedUserInfo.img3 || '',
        cost: updatedUserInfo.cost || 0,
        description: updatedUserInfo.description || '',
        prize: updatedUserInfo.prize || '',
        interest: updatedUserInfo.interest || '',
        language: updatedUserInfo.language || '',
        camera: updatedUserInfo.camera || '',
        portfolio: updatedUserInfo.portfolio || [],
        typeOfPhoto: updatedUserInfo.typeOfPhoto || [],
      };

      // Update the user info in Firebase
      const userInfoRef = ref(db, `user_info/${updatedUserInfo.id}`);
      await set(userInfoRef, updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user information:', error);
      return null;
    }
  }


  async generateNewId(): Promise<number> {
    const users = await this.getUserInfos();
    const maxId = users.length === 0 ? 0 : Math.max(...users.map((user) => user.id));
    return maxId + 1;
  }


  async isUserIdUnique(userId: number): Promise<boolean> {
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const usersRef = ref(db, 'user_info');

    const snapshot = await get(usersRef);
    const data = snapshot.val();

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].user_id === userId) {
            // The username is not unique
            return false;
          }
        }
      }
    }
    return true;
  }

}

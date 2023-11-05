import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, remove, push, get, child, runTransaction } from "firebase/database";
import { environment } from 'src/app/environments/environment';
import { Wall } from 'src/app/models/wall.model';
@Injectable({
  providedIn: 'root'
})
export class Wall1Service {


  getWalls(): Promise<Wall[]> {
    return new Promise((resolve, reject) => {
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const starCountRef = ref(db, 'wall/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const users = [];

        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const userData = data[key];
            const user: Wall = {
              id: userData.id,
              images: userData.images,
              user_id: userData.user_id
            };

            users.push(user);
          }
        }

        resolve(users); // Trả về danh sách người dùng khi hoàn thành
      });
    });
  }

  async getWallById(id: number): Promise<Wall | null> {
    try {
      const userInfos = await this.getWalls();
      const userInfo = userInfos.find((user) => user.id === id);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  }

  async getWallByUserId(id: number): Promise<Wall | null> {
    try {
      const userInfos = await this.getWalls();
      const userInfo = userInfos.find((user) => user.user_id === id);
      return userInfo || null;
    } catch (error) {
      console.error('Error fetching user by username', error);
      return null;
    }
  }


  async createWall(userData: Wall): Promise<Wall | null> {
    try {
      const isUnique = await this.isUserIdUnique(userData.user_id);

      if (!isUnique) {
        console.log('The username is not unique');
        return null;
      }

      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);
      const newUserId = await this.generateNewId();
      const newUserRef = ref(db, 'wall/' + newUserId);

      const newUser: Wall = {
        id: newUserId,
        images: userData.images,
        user_id: userData.user_id
      };

      await set(newUserRef, newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async updateWall(updatedUser: Wall): Promise<Wall | null> {
    try {
      const userInfos = await this.getWallById(updatedUser.id);

      if (userInfos === null) {
        console.error('User information not found for ID:', updatedUser.id);
        return null;
      }
      const app = initializeApp(environment.firebaseConfig);
      const db = getDatabase(app);

      const up: Wall = {
        id: updatedUser.id,
        images: updatedUser.images,
        user_id: updatedUser.user_id
      };

      // Update the user info in Firebase
      const userInfoRef = ref(db, `wall/${updatedUser.id}`);
      await set(userInfoRef, up);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async generateNewId(): Promise<number> {
    const users = await this.getWalls();
    const maxId = users.length === 0 ? 0 : Math.max(...users.map((user) => user.id));
    return maxId + 1;
  }

  async isUserIdUnique(id: number): Promise<boolean> {
    const app = initializeApp(environment.firebaseConfig);
    const db = getDatabase(app);
    const usersRef = ref(db, 'users');

    const snapshot = await get(usersRef);
    const data = snapshot.val();

    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].user_id === id) {
            // The username is not unique
            return false;
          }
        }
      }
    }
    return true;
  }
}

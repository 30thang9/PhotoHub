import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage'

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component {
  constructor(private fileStorage: AngularFireStorage) { }
  file!: File;
  onChangeFile(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      console.log(this.file);
    }
  }

  async onUpload() {
    const path = `yt/${this.file.name}`
    const uploadTask = await this.fileStorage.upload(path, this.file)
    const url = await uploadTask.ref.getDownloadURL()
    console.log(url)

  }
}



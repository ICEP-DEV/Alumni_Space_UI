import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileService } from 'src/app/modules/alumni/profile/profile.service';

import { filesUrl } from 'config';

interface Alumni {
  Bio: string;
  name: string;
  surname: string;
  skills: string;
  location: string;
  email: string;
  experience: string;
  qualification: string;
  interests: string[];
  certificates: any;
  certificateNames: string[];
  pic_file: string;
  id_document: string;
  additional_document: string;
};
@Component({
  selector: 'app-alumni-resume',
  templateUrl: './alumni-resume.component.html',
  styleUrls: ['./alumni-resume.component.css']
})


export class AlumniResumeComponent {
  //  alumni_fullName = "Sihle Mhlongo";
  //  alumni: string[] =[{
  //     fullNames: '',
  //  }]
  // certificates: string[]=[];
  @Input() alumni: Alumni | undefined;
  // certificates: string[] = [ 'assets/certificate1.pdf',
  //     'assets/certificate2.pdf',
  //   'assets/certifacate3.pdf']
  //   certificateNames: string[] = ['Certificate 1', ' Certificate 2', 'certificate 3'];

  //  alumni: Alumni[] = [
  //   {
  //     fullNames: 'Sihle Bandile',
  //     lastName: 'Mhlongo',
  //     Bio: 'I am a highly motivated professional with a passion for [your industry or field]. With a solid background in [mention relevant skills or experiences], I bring a unique blend of [specific qualities] that drive successful outcomes',
  //     address: '245 burger str',
  //     skills: ['JavaScript', 'Angular', 'Node.js'],
  //     email: 'john.doe@example.com',
  //     experience: '5 years',
  //     qualification: 'Bachelor of Science in Computer Science',
  //     interests: ['coding', ' gaming'],
  //   }
  //   ];

  constructor(private ProfileService: ProfileService) {
    //console.log('Hello ' + this.alumni?.certificates[0].certificateName);
  }

  private url = `${filesUrl}/uploads/pics/profiles`

  getAlumniPicturePath(picFile: string  | undefined): string {
    const defaultPicture = 'default-avatar.jpg';
  
    if (picFile && picFile.trim() !== '') {
      return `${this.url}/${picFile}`;
    } else {
      return `${this.url}/${defaultPicture}`;
    }
  }

  getDocuments(docFile: String){
    console.log(docFile);
    return `${filesUrl}/uploads/docs/applications/${docFile}`;
  }
  

}
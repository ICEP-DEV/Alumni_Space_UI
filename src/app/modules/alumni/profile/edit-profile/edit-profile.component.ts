import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../profile.service';
import { baseUrl } from 'config';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  private apiUrl = `${baseUrl}/profile`


  //variables
  message: string = '';
  selectedFile: File | null = null

  isButtonSaveAR: boolean = false;
  isBtnSaveProfPic: boolean = false;
  isBtnSaveCertificate: boolean = false;
  AcademicRChosen: boolean = false;
  profilePicChosen: boolean = false;
  certificateChosen: boolean[] = [];
  skills: string[] = []; // array to hold skills
  newSkill: string = ''; // Input for new skills
  // certificates: File[] = [];
  certificates: File[] = [];
  certificateNames: string[] = []
  fileTypeErrorProfPic: string = '';
  fileTypeErrorCertif: string = '';
  fileTypeErrorAcadRec: string = '';
  isSaveClicked: boolean = false;


  alumni = {
    Name: "",
    Location: "",
    Qualification: "",
    Skills: "",
    Experience: "",
    Employment_Status: "",
    Academic_Transcript: "",
    Interest: "",
    Bio: "",
  }


  ngOnInit() {
    const storedName = localStorage.getItem('Name');
    const account_id = localStorage.getItem('account_id');

    if (storedName && account_id) {
      this.alumni.Name = storedName;
    }
  }

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private profileService: ProfileService) { }
  //using confirmation dialog to confirm user saving profile
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',

      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        this.saveProfile(); // Call the saveProfile function when the dialog is confirmed
        this.showSnackbar('Profile saved successfully!');

      }
      else {
        this.showSnackbar('Not saved');
      }
    });

  }

  //snackbar for displaying success / error messages

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000, // Duration the snackbar is shown in milliseconds
      verticalPosition: 'top', // Set the vertical position to 'top'
      horizontalPosition: 'center', // Set the horizontal position to 'center'
      panelClass: ['snackbar'], // Add your custom class for styling
    });
  }

  open() {
    // this.openDialog();
    //input validation here
    /*if (this.alumni.Name.length != 0 && this.alumni.Experience.length != 0 && this.alumni.Interest.length != 0 && this.alumni.Bio.length != 0 && this.alumni.Location.length != 0 && this.alumni.Qualification.length != 0 && this.alumni.Employment_Status.length != 0) {
      this.openDialog();

    }
    else {
      this.showSnackbar("fill in the empty fields");
    }*/
    this.openDialog();

  }


  saveProfile() {

    const user_id = localStorage.getItem('account_id');

    const formData = { user_id, name: this.alumni.Name, skills: this.skills, experience: this.alumni.Experience, interest: this.alumni.Interest, bio: this.alumni.Bio, location: this.alumni.Location, qualification: this.alumni.Qualification, employment_status: this.alumni.Employment_Status };
    
    //pass data into the server
    this.http.put(`${this.apiUrl}/update/:user_id`, formData).subscribe((response: any) => {
      console.log('Data sent to server:', response);
    });
    console.log(formData);
    console.log(user_id);
    //this.openDialog();

  }

  //add new skill
  addNewSkill() {

    if (this.newSkill.trim() !== '') {
      // const arrayLength = this.skills.length;
      // this.skills.splice(1, arrayLength);
      this.skills.push(this.newSkill);
      this.newSkill = ''; // Reset the input field after adding the skill

    }
  }
  //function to handle academic record selection
  onAcademicRecChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.AcademicRChosen = true;

      //select file
      this.selectedFile = event.target.files[0];
      
      //save
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        this.profileService.uploadDocument(file);

        //this.router.navigate(['/alumni/profile/view-profile']);
      }
      
    }
    else {
      this.AcademicRChosen = false;
    }

    const file: File = event.target.files[0];
    const fileType = file.type;
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (!allowedTypes.includes(fileType)) {
      this.fileTypeErrorAcadRec = 'Invalid file type. Please select a DOCX or PDF file.';
      // Reset the file input if needed
      event.target.value = null;
    } else {
      this.fileTypeErrorAcadRec = 'correct file!'; // Reset the error message if the file type is valid
      // File type is valid, proceed with the file upload or other actions

    }
  }

  //function to handle profile picture selection
  onProfilePicChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.profilePicChosen = true;

      //select file
      this.selectedFile = event.target.files[0];

      //save
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const image = inputElement.files[0];
        this.profileService.uploadImage(image);
        //this.profileService.uploadPicture(image);

        // Navigate to the image view component
        //this.router.navigate(['/alumni/profile/view-profile']);
      }
    } else {
      this.profilePicChosen = false;
    }
    const file: File = event.target.files[0];
    const fileType = file.type;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedTypes.includes(fileType)) {
      this.fileTypeErrorProfPic = 'Invalid file type. Please select a JPG, JPEG, or PNG file.';
      // Reset the file input if needed
      event.target.value = null;
    } else {
      this.fileTypeErrorProfPic = ''; // Reset the error message if the file type is valid
      // File type is valid, proceed with the file upload or other actions

    }
  }
  //function to handle certificate selection
  onCertificateChange(event: any, index: number,index2: number) {

    // index = 0;

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      //this.certificates[index] = file;
      this.certificateChosen[index] = false;
      this.certificateNames[index] = file.name;

      //select file
      this.selectedFile = event.target.files[0];
      this.certificates[index2] = event.target.files[0];

      //save
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        this.profileService.uploadCertificates(file);

        //this.router.navigate(['/alumni/profile/view-profile']);
      }
    } else {
      this.certificateChosen[index] = false;
    }
    //  index++;
    const file: File = event.target.files[0];
    const fileType = file.type;
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (!allowedTypes.includes(fileType)) {
      this.fileTypeErrorCertif = 'Invalid file type. Please select a DOCX or PDF file.';
      // Reset the file input if needed
      event.target.value = null;
    } else {
      this.fileTypeErrorCertif = ''; // Reset the error message if the file type is valid
      // File type is valid, proceed with the file upload or other actions
      // Your code here
      this.certificateChosen[index] = true;
    }

  }
  //adding new certifacate
  addCertificateField() {
    this.certificates.push(new File([], ''));
    this.certificateNames.push('');
    this.certificateChosen.push(true);

  }
  i: number = 0;
  cancelEdit() {
    this.i++;
    this.alumni = {
      Name: "",
      Location: "",
      Qualification: "",
      Skills: "",
      Experience: "",
      Employment_Status: "",
      Academic_Transcript: "",
      Interest: "",
      Bio: "",




    }

    this.isButtonSaveAR = false;
    this.isBtnSaveProfPic = false;
    this.isBtnSaveCertificate = false;
    this.AcademicRChosen = false;
    this.profilePicChosen = false;
    this.certificateChosen[this.i] = false;
    this.isSaveClicked = false;


  }
  saveAcademicRecord() {
    console.log('academic record saved successfully!')
    this.isButtonSaveAR = true;

    //save into database
    if (this.selectedFile) {
      this.profileService.uploadDoc(this.selectedFile).subscribe((response) => {
        // Handle the response from the server
      });
    }

  }

  saveProfilePic() {
    console.log('profile picture saved successfully!')
    var account_id = this.getAccountId();
    this.isBtnSaveProfPic = true;
    if (this.selectedFile) {
      this.profileService.uploadPicture(this.selectedFile, account_id).subscribe((response) => {
        // Handle the response from the server
      });
    }
  }

  saveCertificates() {
  if (this.certificateChosen.every(chosen => chosen && this.certificateNames.every(name => name.length !== 0))) {
    this.isBtnSaveCertificate = true;
    this.isSaveClicked = true;

    // Loop through each certificate
    for (let index = 0; index < this.certificates.length; index++) {
      const selectedFile = this.certificates[index];
      const certificateName = this.certificateNames[index];

      // Assuming you have an account ID available
      var account_id  = this.getAccountId();

      if (selectedFile && certificateName) {
        // Use FormData for each certificate
        const formData = new FormData();
        formData.append('file_name', selectedFile);
        formData.append('certificateName', certificateName);

        // Send each certificate to the server
        this.profileService.uploadCert2(formData, this.getAccountId()).subscribe(response => {
          // Handle the response from the server for each certificate
          console.log(`Certificate uploaded successfully: ${response}`);
        });
      }
    }
  } else {
    this.showSnackbar('Choose a file and fill the certificate name field for all certificates');
  }
}

  returnHome() {
    this.router.navigate(['/alumni/home']);
  }

  getAccountId(){
    const user_id = localStorage.getItem('account_id');
    return user_id;
  }


}
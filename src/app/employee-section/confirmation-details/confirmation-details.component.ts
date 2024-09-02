import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-confirmation-details',
  templateUrl: './confirmation-details.component.html',
  styleUrl: './confirmation-details.component.scss',
})
export class ConfirmationDetailsComponent {
  confirmationDetails: FormGroup;
  currentStep: number = 9;
  generalDetailsArray: any;
  personalDetailsArray: any;
  bankDetailsArray: any;
  contactDetailsArray: any;
  familyDetailsArray: any;
  experienceDetailsArray: any;
  tempExperienceDetailsArray: any;
  educationDetailsArray: any;
  tempEducationDetailsArray: any;
  searchExperienceText: string = '';
  searchEducationText: string = '';
  assetsDetailsArray: any;
  salaryDetailsArray: any;
  emplyeeReferencesArray: any;
  temEmplyeeReferencesArray: any;
  nominationArray: any;
  temnominationArray: any;
  noRecordsFound = false;
  finalsubmisionArray: any;


  constructor(private fb: FormBuilder, private router: Router) {
    this.confirmationDetails = this.fb.group({});
  }

  ngOnInit(): void {
    this.experienceDetailsArray = [];
    this.educationDetailsArray = [];
    if (typeof window !== 'undefined') {

      //generalDetailsArray
      let storedGeneralDetails = localStorage.getItem('generalDetailsArray');
      this.generalDetailsArray = storedGeneralDetails ? JSON.parse(storedGeneralDetails) : null;
      if (this.generalDetailsArray && Array.isArray(this.generalDetailsArray) && this.generalDetailsArray.length > 0) {
        this.generalDetailsArray = this.generalDetailsArray[0];
      } else {
        this.generalDetailsArray = null;
      }


      //personalDetailsArray
      let storedPersonalDetails = localStorage.getItem('personalDetailsArray');
      this.personalDetailsArray = storedPersonalDetails ? JSON.parse(storedPersonalDetails) : null;
      if (this.personalDetailsArray && Array.isArray(this.personalDetailsArray) && this.personalDetailsArray.length > 0) {
        this.personalDetailsArray = this.personalDetailsArray[0];
      } else {
        this.personalDetailsArray = null;
      }


      //bankDetailsArray
      let storedBankDetails = localStorage.getItem('bankDetailsArray');
      this.bankDetailsArray = storedBankDetails ? JSON.parse(storedBankDetails) : null;
      if (this.bankDetailsArray && Array.isArray(this.bankDetailsArray) && this.bankDetailsArray.length > 0) {
        this.bankDetailsArray = this.bankDetailsArray[0];
      } else {
        this.bankDetailsArray = null;
      }

      //contactDetailsArray
      let storedContactDetails = localStorage.getItem('contactDetailsArray');
      this.contactDetailsArray = storedContactDetails ? JSON.parse(storedContactDetails) : null;
      if (this.contactDetailsArray && Array.isArray(this.contactDetailsArray) && this.contactDetailsArray.length > 0) {
        this.contactDetailsArray = this.contactDetailsArray[0];
      } else {
        // Handle the case where the array is empty or doesn't exist
        this.contactDetailsArray = null;
      }


      //familyDetailsArray
      let storedFamilyDetails = localStorage.getItem('familyDetailsArray');
      this.familyDetailsArray = storedFamilyDetails ? JSON.parse(storedFamilyDetails) : null;
      if (this.familyDetailsArray && Array.isArray(this.familyDetailsArray) && this.familyDetailsArray.length > 0) {
        this.familyDetailsArray = this.familyDetailsArray[0];
      } else {
        this.familyDetailsArray = null;
      }


      //experienceDetailsArray
      let storedExperienceDetails = localStorage.getItem('experienceDetailsArray');
      this.experienceDetailsArray = storedExperienceDetails ? JSON.parse(storedExperienceDetails) : null;
      if (this.experienceDetailsArray && Array.isArray(this.experienceDetailsArray)) {
        this.tempExperienceDetailsArray = this.experienceDetailsArray;
      } else {
        // Handle the case where the array doesn't exist or isn't valid
        this.tempExperienceDetailsArray = null;
        this.experienceDetailsArray = null;
      }


      //educationDetailsArray
      let storedEducationDetails = localStorage.getItem('educationDetailsArray');
      this.educationDetailsArray = storedEducationDetails ? JSON.parse(storedEducationDetails) : null;
      if (this.educationDetailsArray && Array.isArray(this.educationDetailsArray)) {
        this.tempEducationDetailsArray = this.educationDetailsArray;
      } else {
        this.tempEducationDetailsArray = null;
        this.educationDetailsArray = null;
      }

      //assetsDetailsArray
      let storedAssetsDetails = localStorage.getItem('assetsDetailsArray');
      this.assetsDetailsArray = storedAssetsDetails ? JSON.parse(storedAssetsDetails) : null;
      if (this.assetsDetailsArray && Array.isArray(this.assetsDetailsArray) && this.assetsDetailsArray.length > 0) {
        this.assetsDetailsArray = this.assetsDetailsArray[0];
      } else {
        this.assetsDetailsArray = null;
      }


      //salaryDetailsArray
      let storedSalaryDetails = localStorage.getItem('salaryDetailsArray');
      this.salaryDetailsArray = storedSalaryDetails ? JSON.parse(storedSalaryDetails) : null;
      if (this.salaryDetailsArray && Array.isArray(this.salaryDetailsArray) && this.salaryDetailsArray.length > 0) {
        this.salaryDetailsArray = this.salaryDetailsArray[0];
      } else {
        this.salaryDetailsArray = null;
      }

    }

    this.emplyeeReferencesArray = [];
    if (typeof window !== 'undefined') {
      const storedRefDetails = localStorage.getItem('emplyeeReferencesArray');
      console.log(storedRefDetails);
      if (storedRefDetails) {
        this.emplyeeReferencesArray = JSON.parse(storedRefDetails);
        this.temEmplyeeReferencesArray = this.emplyeeReferencesArray;
      }
    }

    this.nominationArray = [];
    if (typeof window !== 'undefined') {
      const storedRefDetails = localStorage.getItem('nominationArray');
      console.log(storedRefDetails);
      if (storedRefDetails) {
        this.nominationArray = JSON.parse(storedRefDetails);
        this.temnominationArray = this.nominationArray;
      }
    }
    //finalsubmisionArray
    this.finalsubmisionArray = [
      {
        "id": 0,
        "tenant": "string",
        "personalInfo": {
          "id": 0,
          "tenant": "string",
          "dob": this.formatDate(this.personalDetailsArray.DOB),
          "nationalId": this.personalDetailsArray.Nationalid
        },
        "employeeNumber": this.generalDetailsArray.Employeeid,
        "salutation": 0,
        "firstName": this.generalDetailsArray.Firstname,
        "middleName": this.generalDetailsArray.Middlename,
        "lastName": this.generalDetailsArray.Lastname,
        "gender": this.generalDetailsArray.Gender,
        "workEmail": this.generalDetailsArray.emailid,
        "mobile": this.generalDetailsArray.phoneno,
        "companyId": 0,
        "globalEmployeeId": 0,
        "status": "string",
        "joiningDetails": {
          "id": 0,
          "employeeId": 0,
          "interviewDate": this.formatDate(this.generalDetailsArray.interviewDate),
          "dateOfJoining": this.formatDate(this.generalDetailsArray.unitDOJ),
          "groupDateOfJoining": this.formatDate(this.generalDetailsArray.groupDOJ),
          "confirmed": this.generalDetailsArray.confirmed,
          "confirmationDate": this.formatDate(this.generalDetailsArray.confirmationDate),
          "extMonth": this.formatDate(this.generalDetailsArray.extendedMonth),
          "extDateReason": this.generalDetailsArray.extendedDateReason,
          "currentGroupExperience": this.generalDetailsArray.currentGroupExperience
        },
        "separationDetails": {
          "id": 0,
          "employeeId": 0,
          "resignationDate": this.formatDate(this.generalDetailsArray.resignationDate),
          "dateOfLeaving": this.formatDate(this.generalDetailsArray.unitDOL),
          "retirementDate": this.formatDate(this.generalDetailsArray.retirementDate),
          "groupDateOfLeaving": this.formatDate(this.generalDetailsArray.groupDOL),
          "leavingReason": this.generalDetailsArray.reasonLeaving,
          "retirementExtMonth": "string",
          "extDateReason": "string"
        },
        "bankDetails": [
          {
            "id": 0,
            "employeeId": 0,
            "bankAccountId": this.bankDetailsArray.Saving_Bankid,
            "accountNo": this.bankDetailsArray.Saving_Accountno,
            "ifsc": this.bankDetailsArray.Saving_IFSCcode,
            "accountType": "string"
          }
        ],
        "addressDetails": [
          {
            "id": 0,
            "employeeId": 0,
            "address1": this.contactDetailsArray.Address1,
            "address2": this.contactDetailsArray.Address2,
            "address3": this.contactDetailsArray.Address3,
            "country": this.contactDetailsArray.Country,
            "state": this.contactDetailsArray.State,
            "pincode": this.contactDetailsArray.Pincode,
            "addressType": "string"
          }
        ],
        "identityDetails": {
          "id": 0,
          "employeeId": 0,
          "panNo": this.personalDetailsArray.pan_no,
          "aadhaarNo": this.personalDetailsArray.Aadhar_no,
          "pfNo": this.personalDetailsArray.Company_PF_no,
          "pranNo": this.personalDetailsArray.PRAN_number,
          "labourCardNo": this.personalDetailsArray.Labour_card_no
        },
        "positionDetails": {
          "id": 0,
          "employeeId": 0,
          "department": "string",
          "sectionCode": "string",
          "designation": "string",
          "grade": "string",
          "location": "string"
        },
        "familyDetails": [
          {
            "id": 0,
            "employeeId": 0,
            "gender": "string",
            "name": "string",
            "dob": "2024-08-30",
            "relation": "string"
          }
        ],
        "referenceDetails": [
          {
            "id": 0,
            "employeeId": 0,
            "name": "string",
            "relation": "string",
            "address1": "string",
            "address2": "string",
            "address3": "string",
            "country": "string",
            "state": "string",
            "city": "string",
            "pincode": "string",
            "mobile": "string",
            "email": "string"
          }
        ],
        "nomineeDetails": [
          {
            "id": 0,
            "employeeId": 0,
            "name": "string",
            "relation": "string",
            "percentage": 0,
            "accountType": "string"
          }
        ],
        "assetDetails": [
          {
            "id": 0,
            "employeeId": 0,
            "vehicle": "string",
            "vehicleNo": "string",
            "licenceNo": "string",
            "transCode": "string"
          }
        ],
        "educationDetails": [
          {
            "id": 0,
            "employeeId": 0,
            "qualification": "string",
            "course": "string",
            "university": "string",
            "cgpa": "string",
            "passingYear": "string"
          }
        ],
        "passportDetails": {
          "id": 0,
          "employeeId": 0,
          "passportNo": "string",
          "issueDate": "2024-08-30",
          "expiryDate": "2024-08-30",
          "placeOfIssue": "string"
        },
        "previousEmploymentDetails": {
          "id": 0,
          "employeeId": 0,
          "previousEmployer": "string",
          "previousExperience": 0
        },
        "retirementBenefitDetails": {
          "id": 0,
          "employeeId": 0,
          "pfNo": "string",
          "uanNo": "string",
          "esicNo": "string",
          "esicRegDate": "2024-08-30",
          "esicDispensory": "string",
          "edliNo": "string",
          "gratuityNo": "string",
          "supperAnnuationNo": "string",
          "paymentMode": "string"
        }
      }
    ]
    console.log(this.finalsubmisionArray);


  }

  onSaveAndNext(): void {
    if (this.confirmationDetails.valid) {
      console.log(this.confirmationDetails.value);
      this.currentStep++;
      if (this.currentStep === 9) {
        this.router.navigate(['employee/confirmation-details']); // Navigate to the confirmation Details page
      }
      // Handle other steps and navigation
    } else {
      console.log('Form is invalid');
    }
  }

  next(): void {
    if (this.confirmationDetails.valid) {
      this.currentStep++;
      if (this.currentStep === 9) {
        this.router.navigate(['employee/confirmation-details']); // Navigate to the confirmation Details page
      }
      // Handle other steps and navigation
    } else {
      this.confirmationDetails.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }

  goBack(): void {
    this.router.navigate(['employee/salary-details']); // Adjust the route according to your needs
  }

  cancel(): void {
    this.router.navigate(['/employee-list']); // Navigate to the employee list page
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  searchExperienceByText(searchText: string) {
    const lowercasedSearchText = searchText.toLowerCase();
    this.tempExperienceDetailsArray = this.experienceDetailsArray.filter(
      (item: any) => {
        return Object.keys(item).some((key) =>
          item[key]?.toString().toLowerCase().includes(lowercasedSearchText)
        );
      }
    );
  }
  searchEducationByText(searchText: string) {
    const lowercasedSearchText = searchText.toLowerCase();

    this.tempEducationDetailsArray = this.educationDetailsArray.filter(
      (item: any) => {
        return Object.keys(item).some((key) =>
          item[key]?.toString().toLowerCase().includes(lowercasedSearchText)
        );
      }
    );
  }
  searchReferenceByText(searchText: string) {
    const lowercasedSearchText = searchText ? searchText.toLowerCase() : ''; // Handle empty input
    this.temEmplyeeReferencesArray = this.emplyeeReferencesArray.filter(
      (item: any) => {
        return Object.keys(item).some((key) =>
          item[key]?.toString().toLowerCase().includes(lowercasedSearchText)
        );
      }
    );
  }

  searchNominationByText(searchText: string) {
    const lowercasedSearchText = searchText ? searchText.toLowerCase() : ''; // Handle empty input
    this.temnominationArray = this.nominationArray.filter((item: any) => {
      return Object.keys(item).some((key) =>
        item[key]?.toString().toLowerCase().includes(lowercasedSearchText)
      );
    });
  }




}

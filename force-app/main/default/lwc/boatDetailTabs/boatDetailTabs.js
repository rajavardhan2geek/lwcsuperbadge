import {LightningElement,wire} from 'lwc';
import labelDetails from '@salesforce/label/c.Details';
import labelReviews from '@salesforce/label/c.Reviews';
import labelAddReview from '@salesforce/label/c.Add_Review';
import labelFullDetails from '@salesforce/label/c.Full_Details';
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat';
import boatobj from '@salesforce/schema/Boat__c' ;
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name'
import BOAT_ID_FIELD from  '@salesforce/schema/Boat__c.Id'
import {getRecord} from 'lightning/uiRecordApi';
import { getFieldValue } from 'lightning/uiRecordApi';
import {APPLICATION_SCOPE, MessageContext,subscribe } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/BoatmessageChannel__c';
import { NavigationMixin } from 'lightning/navigation';
// Custom Labels Imports
// import labelDetails for Details
// import labelReviews for Reviews
// import labelAddReview for Add_Review
// import labelFullDetails for Full_Details
// import labelPleaseSelectABoat for Please_select_a_boat
// Boat__c Schema Imports
// import BOAT_ID_FIELD for the Boat Id
// import BOAT_NAME_FIELD for the boat Name
const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];
export default class BoatDetailTabs extends NavigationMixin(LightningElement) {
   boatId;
  @wire(getRecord,{recordId:'$boatId',fields: BOAT_FIELDS})wiredRecord;
  
  label = {
    labelDetails:labelDetails,
    labelReviews:labelReviews,
    labelAddReview:labelAddReview,
    labelFullDetails:labelFullDetails,
    labelPleaseSelectABoat:labelPleaseSelectABoat
  };
  

  // Utilize getFieldValue to extract the boat name from the record wire
  get boatName() { 

    return getFieldValue(this.wiredRecord.data,BOAT_NAME_FIELD);

  }
  // Decide when to show or hide the icon
  // returns 'utility:anchor' or null
  get detailsTabIconName() { 

       return this.wiredRecord && this.wiredRecord.data ? 'utility:anchor' : null;


}

  // Private
  subscription = null;
  @wire(MessageContext) messageContext;
  // Subscribe to the message channel
  subscribeMC() {
    // local boatId must receive the recordId from the message
    this.subscription= subscribe(
      this.messageContext,
      BOATMC, (message) => {
        console.log('message channel '+message.recordId);
          this.boatId =message.recordId;
         
      },
      { scope: APPLICATION_SCOPE }
      
      );
  }
  
  // Calls subscribeMC()
  connectedCallback() { 
    if (this.subscription || this.recordId) {
      return;
    }
    this.subscribeMC();

  }
  
  // Navigates to record page
  navigateToRecordViewPage() {
          this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.boatId,
                objectApiName: 'Boat__c', // objectApiName is optional
                actionName: 'view'
            }
          });

   }
  
  // Navigates back to the review list, and refreshes reviews component
  handleReviewCreated() {

  this.template.querySelector('lightning-tabset').activeTabValue = 'Reviews ';
  this.template.querySelector('c-boat-reviews').refresh();

   }
}
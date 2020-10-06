import {LightningElement,api,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT     = 'Ship it!';
const SUCCESS_VARIANT     = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';
export default class BoatSearchResults extends NavigationMixin(LightningElement) {
  selectedBoatId;
  columns = [];
  boatTypeId = '';
  boats;
  isLoading = false;
  
  // wired message context
  messageContext;
  // wired getBoats method 
  wiredBoats(result) { }
  
  // public function that updates the existing boatTypeId property
  // uses notifyLoading

  searchBoats(boatTypeId) { 

    console.log('bsr child '+boatTypeId);
    getBoats({'boatTypeId' : boatTypeId}).then((data)=>{console.log(data);this.boatList=data;})
    .catch((error)=>console.log(error));
  }
  
  // this public function must refresh the boats asynchronously
  // uses notifyLoading
  refresh() { }
  
  // this function must update selectedBoatId and call sendMessageService
  updateSelectedTile() { }
  
  // Publishes the selected boat Id on the BoatMC.
  sendMessageService(boatId) { 
    // explicitly pass boatId to the parameter recordId
  }
  
  // This method must save the changes in the Boat Editor
  // Show a toast message with the title
  // clear lightning-datatable draft values
  handleSave() {
    const recordInputs = event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
  /** const promises = recordInputs.map(recordInput =>
            //update boat record
        );**/
    Promise.all(promises)
        .then(() => {})
        .catch(error => {})
        .finally(() => {});
  }
  // Check the current value of isLoading before dispatching the doneloading or loading custom event
  notifyLoading(isLoading) { }
}
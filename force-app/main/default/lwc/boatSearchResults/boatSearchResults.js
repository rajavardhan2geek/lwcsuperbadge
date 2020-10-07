import {LightningElement,api,track,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation'
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { MessageContext,publish } from 'lightning/messageService';
import {updateRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import {refreshApex} from '@salesforce/apex';

const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT     = 'Ship it!';
const SUCCESS_VARIANT     = 'success';
const e   = 'Error';
const ERROR_VARIANT = 'error';
const LOADING_EVENT = 'loading';
const DONE_LOADING_EVENT = 'doneloading';
export default class BoatSearchResults extends NavigationMixin(LightningElement) {
  @api selectedBoatId;
  columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Length', fieldName: 'Length__c', type: 'decimal' ,cellAttributes:{alignment:'center'},editable:true},
    { label: 'Price', fieldName: 'Price__c', type: 'currency',cellAttributes:{alignment:'center'},editable:true },
    { label: 'Description', fieldName: 'Description__c', type: 'text' ,editable:true},
  ];
  boatTypeId='';

  wiredBoatsResult; 
  boats;
  isLoading = false;
  
  // wired message context
  @wire(MessageContext)messageContext;
  // wired getBoats method 
  @wire(getBoats,{boatTypeId:'$boatTypeId'})  wiredBoats(result){
    this.wiredBoatsResult=result;
    this.boats = result;
    if (result.error) {
        this.error = result.error;
        this.boats = undefined;
        this.wiredBoatsResult=undefined;
    }
    this.isLoading = false;
     this.notifyLoading(this.isLoading);
  }
  
  // public function that updates the existing boatTypeId property
  // uses notifyLoading

  @api
   searchBoats(boatTypeId) { 
    
    console.log('searching !!'+this.boatTypeId);
    this.isLoading = true;
   this.notifyLoading(this.isLoading);
   this.boatTypeId = boatTypeId;
   this.isLoading = false;
   this.notifyLoading(this.isLoading); 
   // getBoats({boatId:this.boatTypeId}).then((data)=>{this.boats=data;})
    //this.notifyLoading(true);
   
  }
  
  // this public function must refresh the boats asynchronously
  // uses notifyLoading
  @api 
  async refresh() { 
 
   this.isLoading = true;
   this.notifyLoading(true);      
    refreshApex(this.boats);
   this.isLoading = false;
   this.notifyLoading(false);      
      
  }
  
  // this function must update selectedBoatId and call sendMessageService
  updateSelectedTile(event) { 
    console.log(event.detail.boatId);
    this.selectedBoatId=event.detail.boatId;
    this.sendMessageService(this.selectedBoatId); 
  }
  
  // Publishes the selected boat Id on the BoatMC.
  sendMessageService(boatId) { 
    // explicitly pass boatId to the parameter recordId
   
   
    const boatmsg={
      recordId:boatId
    }
    publish(this.messageContext, BOATMC, boatmsg);
    

  }
  
  // This method must save the changes in the Boat Editor
  // Show a toast message with the title
  // clear lightning-datatable draft values
  handleSave(event) {
    console.log('draftvalues'+event.detail.draftValues);
    const recordInputs = event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
   const promises = recordInputs.map(recordInput =>
            //update boat record
            updateRecord(recordInput)

        );
    Promise.all(promises)
        .then(() => {
          const event = new ShowToastEvent({
            title: SUCCESS_TITLE,
            message:  MESSAGE_SHIP_IT,
            variant:SUCCESS_VARIANT
        });
        this.dispatchEvent(event);
        return this.refresh();

        })
        .catch(error => {
          const event = new ShowToastEvent({
            title: ERROR_TITLE,
            message:  this.error.body.message,
            variant:ERROR_VARIANT
        });
        this.dispatchEvent(event);

        this.notifyLoading(false);
        })
        .finally(() => {
          this.draftValues={};

        });
  }
  // Check the current value of isLoading before dispatching the doneloading or loading custom event
  notifyLoading(isloading) {
    
    if (isloading) {
      this.dispatchEvent(new CustomEvent('loading'));
  } else {
      this.dispatchEvent(CustomEvent('doneloading'));
  }
      

  }
}
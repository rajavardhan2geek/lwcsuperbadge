import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOAT_REVIEW_OBJECT from '@salesforce/schema/BoatReview__c';
import NAME_FIELD from '@salesforce/schema/BoatReview__c.Name';
import COMMENT_FIELD from '@salesforce/schema/BoatReview__c.Comment__c';
import RATING_FIELD from '@salesforce/schema/BoatReview__c.Rating__c';
import BOAT_FIELD from '@salesforce/schema/BoatReview__c.Boat__c';
const SUCCESS_TITLE = 'Review Created!';
const SUCCESS_VARIANT = 'success';
export default class BoatAddReviewForm extends LightningElement {
     boatId;
    rating=0;
    boatReviewObject = BOAT_REVIEW_OBJECT;
    nameField        = NAME_FIELD;
    commentField     = COMMENT_FIELD;
    labelSubject = 'Review Subject';
    labelRating  = 'Rating';
    
    @api
    get recordId() {
        return this.boatId;
    }
    set recordId(value) {
        //this.setAttribute('boatId', value);
        this.boatId = value;
    }


    handleRatingChanged(event) {
        this.rating = event.detail.rating;
    }

    handleSuccess() {
        const evt = new ShowToastEvent({
            title: SUCCESS_TITLE,
            message: '',
            variant: SUCCESS_VARIANT,
        });
        this.dispatchEvent(evt);
        this.dispatchEvent(new CustomEvent("createreview"));

        this.handleReset();
    }

    handleSubmit(event) {
        event.preventDefault();   
        const fields= event.detail.fields;
        fields.Boat__c = this.boatId;
        fields.Rating__c = this.rating;
        console.log(fields);
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
     // Clears form data upon submission
    // TODO: it must reset each lightning-input-field
    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }
}

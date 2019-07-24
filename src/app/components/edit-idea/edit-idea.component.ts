import { Component, OnInit, Inject } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Idea, IdeaInjection, IdeaInjectionType } from './models';
import { INJECTION_TOKENS } from 'src/app/services/modal/modal.service';
import { NOT_ONLY_SPACES } from 'src/app/utils/regexps';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MyCollectionService } from '../my-collection/my-collection.service';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss']
})
export class EditIdeaComponent implements OnInit {

  ideaForm: FormGroup;
  modalType: IdeaInjectionType;

  constructor(
    public ls: LocalizationService,
    private formBuilder: FormBuilder,
    private storageService: LocalStorageService,
    private myCollectionService: MyCollectionService,
    @Inject(INJECTION_TOKENS.IDEA) public injectedIdeaData: IdeaInjection,
  ) { }

  ngOnInit(): void {
    this.ideaForm = this.createIdeaForm();
    this.modalType = this.injectedIdeaData.type;
  }

  handleSubmitButton(): void {
    const submitHandlersByType: { [key in IdeaInjectionType]: () => any } = {
      collect: this.handleCollectIdea.bind(this),
      create: this.handleCreateIdea.bind(this),
      edit: this.handleEditIdea.bind(this),
    }
    submitHandlersByType[this.modalType]();
  }

  trim(controlName: string): void {
    const currentValue = this.ideaForm.controls[controlName].value as string;
    this.ideaForm.controls[controlName].setValue(currentValue.trim());
  }

  getModalTitle(): string {
    let result: string;
    const modalTitlesByType: { [key in IdeaInjectionType]: string } = {
      collect: this.ls.getMessage('collectIdea'),
      create: this.ls.getMessage('createIdea'),
      edit: this.ls.getMessage('editIdea')
    }
    result = modalTitlesByType[this.modalType];
    if (!result) {
      throw new Error('EditIdeaComponent -> getModalTitle(): no such modal type')
    }
    return result;
  }

  getSubmitButtonText(): string {
    let result: string;
    const buttonTextsByType: { [key in IdeaInjectionType]: string } = {
      collect: this.ls.getMessage('collect'),
      create: this.ls.getMessage('save'),
      edit: this.ls.getMessage('save')
    }
    result = buttonTextsByType[this.modalType];
    if (!result) {
      throw new Error('EditIdeaComponent -> getSubmitButtonText(): no such modal type')
    }
    return result;
  }

  private createIdeaForm(): FormGroup {
    return this.formBuilder.group({
      title: new FormControl(this.injectedIdeaData.idea.title, [
        Validators.required,
        Validators.pattern(NOT_ONLY_SPACES),
      ]),
      description: new FormControl(this.injectedIdeaData.idea.description || ''),
    });
  }

  private handleCollectIdea() {
    this.myCollectionService.ideaCollecting.next(this.ideaForm.value as Idea);
  }

  private handleEditIdea() {
    this.myCollectionService.ideaEditing.next(this.ideaForm.value as Idea);
  }

  private handleCreateIdea() {
    this.myCollectionService.ideaCreating.next(this.ideaForm.value as Idea);
  }



}

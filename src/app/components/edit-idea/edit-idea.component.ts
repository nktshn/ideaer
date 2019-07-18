import { Component, OnInit, Inject, Optional } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Idea } from './models';
import { INJECTION_TOKENS } from 'src/app/services/modal/modal.service';
import { NOT_ONLY_SPACES } from 'src/app/utils/regexps';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { EditIdeaService } from './edit-idea.service';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss']
})
export class EditIdeaComponent implements OnInit {

  ideaForm: FormGroup;

  constructor(
    public ls: LocalizationService,
    private formBuilder: FormBuilder,
    private storageService: LocalStorageService,
    private editIdeaService: EditIdeaService,
    @Inject(INJECTION_TOKENS.IDEA) public idea: Idea,
  ) { }

  ngOnInit(): void {
    this.ideaForm = this.createIdeaForm();
  }

  onCollectIdea(): void {
    this.collectIdea(this.ideaForm.value as Idea);
  }

  trim(controlName: string): void {
    const currentValue = this.ideaForm.controls['title'].value as string;
    this.ideaForm.controls[controlName].setValue(currentValue.trim());
  }

  private createIdeaForm(): FormGroup {
    return this.formBuilder.group({
      title: new FormControl(this.idea.title, [
        Validators.required,
        Validators.pattern(NOT_ONLY_SPACES),
      ]),
      description: new FormControl(this.idea.description || ''),
    });
  }

  private collectIdea(idea: Idea): void {
    const collection = this.storageService.useCollection<Idea>('ideas');
    collection.add(idea);
    this.editIdeaService.ideaHasBeenCollected.next();
  }

}

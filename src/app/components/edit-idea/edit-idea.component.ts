import { Component, OnInit, Inject, Optional } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Idea } from './models';
import { INJECTION_TOKENS } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.scss']
})
export class EditIdeaComponent implements OnInit {

  ideaForm: FormGroup;
  ideaFormControls: {
    [key: string]: AbstractControl;
  };

  constructor(
    public ls: LocalizationService,
    private formBuilder: FormBuilder,
    @Inject(INJECTION_TOKENS.idea) public idea: Idea,
  ) { }

  ngOnInit(): void {
    console.log('idea: ', this.idea);
    this.ideaForm = this.formBuilder.group({
      title: new FormControl(this.idea.title, [Validators.required]),
      description: new FormControl(this.idea.description || ''),
    });
    this.ideaFormControls = this.ideaForm.controls;
  }

  onCollectIdea(): void {

  }

}

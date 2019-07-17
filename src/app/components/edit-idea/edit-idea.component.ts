import { Component, OnInit, Inject, Optional } from '@angular/core';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Idea } from './models';
import { INJECTION_TOKENS } from 'src/app/services/modal/modal.service';
import { NOT_ONLY_SPACES } from 'src/app/utils/regexps';

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
    @Inject(INJECTION_TOKENS.IDEA) public idea: Idea,
  ) { }

  ngOnInit(): void {
    this.initIdeaForm();
  }

  onCollectIdea(): void {

  }

  private initIdeaForm(): void {
    this.ideaForm = this.formBuilder.group({
      title: new FormControl(this.idea.title, [
        Validators.required,
        Validators.pattern(NOT_ONLY_SPACES),
      ]),
      description: new FormControl(this.idea.description || ''),
    });
  }

}

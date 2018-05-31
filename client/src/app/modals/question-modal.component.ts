import { Component, OnInit, Inject } from '@angular/core'
import { routerTransition } from '../router.transition'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Question } from '../models/question.model'
import { Answer } from '../models/answer.model'
import { QuestionService } from '../services/question.service'
import { ErrorModalComponent } from './confirm-modal.component'

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html'
})
export class QuestionModalComponent {

  points: number
  question: Question

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: QuestionService) {
    this.question = data.question
    this.question.points = this.question.points || 1
  }

  onNoClick(): void {
    this.dialogRef.close()

  }

  correctClick(answer: Answer): void {
    setTimeout(() => {
      this.changeCorrect(answer)
    }, 50)
  }

  changeCorrect(answer: Answer): void {
    const answers = this.question.answers

    for (let i = 0; i < answers.length; i++)
      answers[i].correct = false
    answer.correct = true

  }

  saveQuestion() {
    this.service.save(this.question).subscribe(res => this.dialogRef.close(), err => {
      console.error(err.error.message)
      this.dialog.open(ErrorModalComponent, {
        data: {
          error: err.error.message
        }
      })
    })
  }

  getLabel(value: number) {
    return `${value || 0} P`
  }
}
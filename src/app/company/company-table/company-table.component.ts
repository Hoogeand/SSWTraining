import { ChangeDetectionStrategy, Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush  //Only repaint if the input paramters change
})
export class CompanyTableComponent implements OnInit {
  @Input() companies: Company[] | null = [];
  @Output() deleteButtonClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCompany(companyiD: number): void {
    this.deleteButtonClicked.emit(companyiD);
  }
}

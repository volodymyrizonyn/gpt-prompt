import { Component, OnInit } from '@angular/core';
import { AuthService, DialogService, TemplateApiService } from '@services';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateDialogComponent } from '@modules/template/components/template-dialog/template-dialog.component';
import { DialogType } from '@enums';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Template } from '@models';
import { PageEvent } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private isMy: boolean = false;
  templates: Template[] = [];
  public totalCount: number = 1;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  search: string = '';
  searchInput$: Subject<string> = new Subject<string>();

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    private templateApiService: TemplateApiService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.isMy = !!data['isMy'];
      this.getTemplates();
    });

    this.searchInput$.pipe(debounceTime(600)).subscribe(() => {
      this.getTemplates();
    });
  }

  getTemplates(event?: PageEvent) {
    if (event) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
    }
    this.templateApiService
      .getTemplates(this.isMy, { search: this.search, pageIndex: this.pageIndex, pageSize: this.pageSize })
      .subscribe(
        (res) => {
          if (!res.success) {
            this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
            return;
          }
          this.templates = res.result?.data || [];
          this.totalCount = res.result?.totalCount || 0;
          if (this.totalCount <= this.pageSize * this.pageIndex) {
            this.pageIndex = 0;
          }
        },
        (err: HttpErrorResponse) => {
          this.snackBar.open(err.message || '', 'Dismiss', { duration: 4000 });
        },
      );
  }

  editable(template: Template): boolean {
    return this.authService.getUser()?.id == template.userId;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  clearSearch() {
    if (this.search) {
      this.search = '';
      this.searchInput$.next('');
    }
  }

  openTemplateDialog(template?: Template) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.dialogService
      .open(TemplateDialogComponent, {
        data: { dialogType: DialogType.TEMPLATE, data: template },
        width: '800px',
      })
      .afterClosed()
      .subscribe((res) => {
        this.getTemplates();
      });
  }
}

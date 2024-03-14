import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { Univer } from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverUIPlugin } from '@univerjs/ui';

@Component({
  selector: 'univer-sheet',
  template: `<div #containerRef class="univer-container"></div>`,
  styleUrls: ['./univer-sheet.component.css'],
})
export class UniverSheetComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @ViewChild('containerRef', { static: true }) containerRef: ElementRef | null = null;

  private univer: Univer | null = null;
  private workbook: any;

  ngOnInit() {
    this.init(this.data);
  }

  ngOnDestroy() {
    this.destroyUniver();
  }

  private init(data = {}) {
    if (!this.containerRef) {
      throw new Error('Container reference is not initialized');
    }

    const univer = new Univer({
      theme: defaultTheme,
    });
    this.univer = univer;

    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
      container: this.containerRef.nativeElement,
      header: true,
      toolbar: true,
      footer: true,
    });

    // doc plugins
    univer.registerPlugin(UniverDocsPlugin, {
      hasScroll: false,
    });
    univer.registerPlugin(UniverDocsUIPlugin);

    // sheet plugins
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);

    // create workbook instance
    this.workbook = univer.createUniverSheet(data);
  }

  private destroyUniver() {
    this.univer?.dispose();
    this.univer = null;
    this.workbook = null;
  }

  public getData() {
    if (!this.workbook) {
      throw new Error('Workbook is not initialized');
    }
    return this.workbook.save();
  }
}

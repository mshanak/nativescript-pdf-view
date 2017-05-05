import * as app from 'application';
import { Property } from 'tns-core-modules/ui/core/dependency-observable';
import * as proxy from 'tns-core-modules/ui/core/proxy';
import * as view  from 'tns-core-modules/ui/core/view';
import * as dialogs from 'tns-core-modules/ui/dialogs';


export abstract class PDFView extends view.View {
  private static srcProperty = new Property(
    'src', 'PdfView', new proxy.PropertyMetadata(''));

  public static loadEvent = 'load';

  public static notifyOfEvent(eventName: string, pdfViewRef: WeakRef<PDFView>) {
    const viewer = pdfViewRef.get();

    if (viewer) {
      viewer.notify({ eventName, object: viewer });
    }
  }

  public get src(): string {
    return this._getValue(PDFView.srcProperty);
  }

  public set src(src: string) {
    this._setValue(PDFView.srcProperty, src);
    this.loadPDF(src);
  }

  public abstract loadPDF(src: string);
}

try {
  const registerElement =
    require('nativescript-angular/element-registry').registerElement;

  registerElement('PDFView', () => require('./plugin').PDFView);
} catch (e) {
  // it's ok. nativescript-angular isn't installed.
}

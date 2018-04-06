module powerbi.extensibility.visual {
    "use strict";

    export interface IVisual {
        update(options: VisualUpdateOptions) : void;
         destroy?() : void;
      }

      export interface VisualUpdateOptions {
        viewport: IViewPort;
        dataViews: DataView[];
    }

    export interface IViewPort {
        height: number;       
        width: number;
    }

    export interface DataView {
        categorical?: DataViewCategorical;
    }

    export interface DataViewCategorical {
        categories?: string[];
        values?: number[];
    }

    export interface VisualConstructorOptions {
        element: HTMLElement;
    }

}

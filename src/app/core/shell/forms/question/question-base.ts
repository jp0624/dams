export class QuestionBase<T>{
    value?: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    selected: number;
    controlType: string;
    version: string;
    attr: any;
    versioning?: boolean;
    type: any;
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        selected?: number,
        controlType?: string,
        version?: string,
        versioning?: boolean,
        attr?: any,
        type?: any
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = options.required || false;
      this.order = options.order === undefined ? 1 : options.order;
      this.selected = options.selected || 0;
      this.controlType = options.controlType || '';
      this.version = options.version || '';
      this.attr = options.attr || '';
      this.versioning = options.versioning || false;
    }
  }
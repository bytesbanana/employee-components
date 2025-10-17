import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Data } from "../typings";
import debounce from "lodash.debounce";
import { getAllData } from "../data";

@customElement("employee-search")
export class EmployeeSearch extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `;
  @property({ type: String })
  id = "employee-search-input";
  @property({ type: String })
  name = "employee-search-input";

  @state()
  private value = "";
  @state()
  private loading = false;
  @state() results: Data[] = [];

  private DEBOUCE_RATE = 300;

  render() {
    return html`${this.inputTemplate()}${this.loadingTemplate()} `;
  }

  private inputTemplate() {
    return html` <input
      .id=${this.id}
      .name=${this.name}
      .value=${this.value}
      @input=${this._handleInput}
      placeholder="Name, Email, ID"
    />`;
  }

  private loadingTemplate() {
    if (this.loading) {
      return html` <iconify-icon
        icon="eos-icons:loading"
        width="24"
        height="24"
      ></iconify-icon>`;
    }
    return "";
  }

  private _debouncedSearch = debounce(async (value: string) => {
    if (value.length < 2) {
      return;
    }

    try {
      this.loading = true;
      const data = await getAllData();
      this.results = data.filter(({ employee }) => {
        return (
          employee.name.includes(value) ||
          employee.id.includes(value) ||
          employee.department.manager.contact.email.includes(value)
        );
      });

      this._dispatchSearchEvent();
    } catch (error) {
      console.error(error);
      this.results = [];
    } finally {
      this.loading = false;
    }
  }, this.DEBOUCE_RATE);

  private async _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    await this._debouncedSearch(this.value);
  }

  private _dispatchSearchEvent() {
    this.dispatchEvent(
      new CustomEvent("search", {
        detail: { results: this.results, query: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Data } from "../typings";
import debounce from "lodash.debounce";
import data from "../data/data.json" with { type: "json" };

@customElement("employee-search")
export class EmployeeSearch extends LitElement {
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
      return html`<div>loading...</div>`;
    }
    return "";
  }

  private _debouncedSearch = debounce(async (value: string) => {
    if (value.length < 2) {
      return;
    }

    try {
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 300));
      this.results = (data as Data[]).filter(({ employee }) => {
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

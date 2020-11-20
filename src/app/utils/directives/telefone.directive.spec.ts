import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TelefoneDirective } from './telefone.directive';

@Component({
  template: `<input type="text" telefone>`,
})
class TesteTelefoneDirectiveComponent {

}

fdescribe('TelefoneDirective', () => {

  let component: TesteTelefoneDirectiveComponent;
  let fixture: ComponentFixture<TesteTelefoneDirectiveComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [TelefoneDirective, TesteTelefoneDirectiveComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(TesteTelefoneDirectiveComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.nativeElement.querySelector('input');
  });

  it('deve formatar o telefone com 10 dígitos', () => {

    inputEl.value = '6199720605';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.value).toEqual('(61) 9972-0605');
  });

  it('deve formatar o telefone com 11 dígitos', () => {

    inputEl.value = '61999720605';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.value).toEqual('(61) 99972-0605');
  });
});

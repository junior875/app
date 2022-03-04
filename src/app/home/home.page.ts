
import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { actionSheetController } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasks : any[] = [];
  prioritys : any[] = [];

  constructor(private alertCtrl: AlertController, private ToastCtrl: ToastController, private acttionSheetCtrl : ActionSheetController) { 
    let taskJson = localStorage.getItem('taskDb');

    if(taskJson!=null){
      this.tasks = JSON.parse(taskJson);
    }//end if

    let priorityJson = localStorage.getItem('priorityDb');

    if(priorityJson!=null){
      this.prioritys = JSON.parse(priorityJson);
    }//end if
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'o que deseja fazer',
          
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('clicked cancel');
          },
        },
        {
          text: 'Adicionar',
          handler: (form) => {
          
            console.log(form.newTask);

            this.add(form.newTask);
          },//end handler
        },//end add
      ],
    });//end function
    await alert.present();
  }//end showAdd

  async showAdd2() {
    const alert = await this.alertCtrl.create({
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          placeholder: 'o que deseja fazer',
          
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('clicked cancel');
          },
        },
        {
          text: 'Adicionar',
          handler: (form) => {
    
            this.add(form.newTask, true);
          },//end handler
        },//end add
      ],
    });//end function
    await alert.present();
  }//end showAdd

  async add(newTask: string, priority: boolean = false) {
    //valida se o usuário preencheu a tarefa
    if (newTask.trim().length < 1) {
        const toast = await this.ToastCtrl.create({
        message : 'informe o que deseja fazer!',
        duration: 2000 ,
        position: 'top'
      });//end function
      
      toast.present();
      return;
    }//end if

    let task = {name : newTask, done: false};

    !priority? this.tasks.push(task): this.prioritys.push(task);

    this.updateLocalStorage();
  }//end add

  updateLocalStorage(){
    localStorage.setItem('taskDb', JSON.stringify(this.tasks));
    localStorage.setItem('priorityDb', JSON.stringify(this.prioritys));
  }

  

  async openActions(task : any){
    const actionSheet = await this.acttionSheetCtrl.create({
      header: 'O que deseja fazer?',
      buttons: [{
        text: task.done ? 'desmarcar' : 'marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          task.done = !task.done;

          this.updateLocalStorage();
        }
      }
        , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
    }]        
  });   
    await actionSheet.present();
  }//end openActions

  async openActions2(priority : any){
    const actionSheet = await this.acttionSheetCtrl.create({
      header: 'O que deseja fazer?',
      buttons: [{
        text: priority.done ? 'desmarcar' : 'marcar',
        icon: priority.done ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          priority.done = !priority.done;

          this.updateLocalStorage();
        }
      }
        , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
    }]        
  });   
    await actionSheet.present();
  }//end openActions

  delete(task : any, priority : any){
    this.tasks = this.tasks.filter(taskArray=> task != taskArray);
    this.updateLocalStorage();
  }//end delete function

  deletep(priority : any){
    this.prioritys = this.prioritys.filter(taskArray=> priority != taskArray);
    this.updateLocalStorage();
  }//end delete function
}//end home page
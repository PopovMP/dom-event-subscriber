# DomEventSubscriber

Helps to subscribe and unsubscribe  HTML Elements to DOM events

## Usage

```TS
 class FooPresenter extends DomEventSubscriber
 {
     constructor()
     {
         super()
         this.subscriber = this
     }

     public initView()
     {
         const btn: HTMLButtonElement = document.getElementById('btn') as HTMLButtonElement
         this.subscribe(btn, 'click', this.btn_click)

         const links: HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByClassName('link') as HTMLCollectionOf<HTMLAnchorElement>
         this.subscribeAll(links, 'click', this.link_click)
     }

     public closeView()
     {
         this.unsubscribeAll()
     }

     private btn_click(event: Event)
     {
         event.preventDefault()
         /* ... */
     }

   private link_click(event: Event)
   {
       event.preventDefault()
	   /* ... */
   }
 }
```

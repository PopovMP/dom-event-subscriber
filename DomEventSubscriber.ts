/** DomEventSubscriber v23.02.16 */

type DomEventListener = (event: any, ...args: any[]) => void

interface IDomSubscription {
	element     : EventTarget
	eventName   : string
	listener    : EventListener
	domListener : DomEventListener
}

class DomEventSubscriber
{
	private _subscriber: DomEventSubscriber | undefined
	private readonly subscriptions : IDomSubscription[]

	constructor(subscriber?: any)
	{
		if (subscriber)
			this._subscriber = subscriber

		this.subscriptions = []
	}

	public get subscriber(): DomEventSubscriber
	{
		if (!this._subscriber)
			console.error(`${this.constructor.name} is not initialized`)

		return this
	}

	public set subscriber(subscriber: DomEventSubscriber)
	{
		if (this._subscriber) {
			console.error(`${this.constructor.name} is already initialized`)
			return
		}

		this._subscriber = subscriber
	}

	public subscribe(element: EventTarget, eventName: string, domListener: DomEventListener, ...args: any[]): void
	{
		if (!this._subscriber) {
			console.error(`${this.constructor.name} is not initialized`)
			return
		}

		if (this.subscriptions.some( (sub: IDomSubscription): boolean =>
				sub.element === element && sub.eventName === eventName && sub.domListener === domListener )) {
			const target = `${this._subscriber.constructor.name} :: ${domListener.name || 'lambda'}`
			console.error(`${target} is already bound to event: ${eventName}`)
		}

		const listener = (event: Event): void => domListener.call(this._subscriber, event, ...args)

		element.addEventListener(eventName, listener)

		this.subscriptions.push({element, eventName, listener, domListener})
	}

	public subscribeAll(elements: HTMLCollection | EventTarget[], eventName: string, domListener: DomEventListener,
	                    ...args: any[]): void
	{
		for (let i = 0; i < elements.length; i++)
			this.subscribe(elements[i], eventName, domListener, ...args)
	}

	public unsubscribeAll(): void
	{
		if (!this._subscriber) {
			console.error(`${this.constructor.name} is not initialized`)
			return
		}

		if (this.subscriptions.length === 0) {
			console.error(`${this._subscriber.constructor.name} has no active subscriptions`)
			return
		}

		while(this.subscriptions.length > 0) {
			const subscription = this.subscriptions.shift() as IDomSubscription
			subscription.element.removeEventListener(subscription.eventName, subscription.listener)
		}
	}
}

class PostMessageEventBus {
  private current: Window;
  private target: Window;
  private events: Record<string, Array<(payload: any) => void>> = {};

  public constructor(current: Window, target: Window) {
    this.current = current;
    this.target = target;
    this.current.addEventListener('message', (e: MessageEvent) => {
      const event = e.data?.event;
      if (this.events[event]) {
        this.events[event].forEach(cb => cb(e.data.payload));
      }
    });
  }

  public on(event: string, callback: (payload: any) => void) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(callback);
    return this;
  }

  public emit(event: string, payload: any) {
    this.target.postMessage(
      {
        event,
        payload,
      },
      '*',
    );
    return this;
  }

  public off(event: string, callback?: (payload: any) => void) {
    const cbs = this.events[event];
    if (!cbs) return this;
    if (!callback) {
      this.events[event] = [];
      return this;
    }
    const index: number = cbs.indexOf(callback);
    ~index && cbs.splice(index, 1);
    return this;
  }
}

export default new PostMessageEventBus(window, window.top);

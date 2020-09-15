class PostMessageEventBus {
  private current: Window;
  private target: Window;

  public constructor(current: Window, target: Window) {
    this.current = current;
    this.target = target;
  }

  public on(event: string, callback: () => void) {
    this.current.addEventListener('message', (e: MessageEvent) => {
      console.log(e);
    });
  }

  public emit(event: string, payload: any) {
    this.target.postMessage(
      {
        event,
        payload,
      },
      '*',
    );
  }
}

export default new PostMessageEventBus(window, window.top);

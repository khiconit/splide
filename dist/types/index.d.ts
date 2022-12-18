/**
 * The interface for the Media component.
 *
 * @since 4.0.0
 */
interface BreakpointsComponent extends BaseComponent {
    /** @internal */
    reduce(reduced: boolean): void;
    set(options: Options, base?: boolean, notify?: boolean): void;
}

/**
 * The interface for the Direction component.
 *
 * @since 3.0.0
 */
interface DirectionComponent extends BaseComponent {
    resolve<K extends keyof typeof ORIENTATION_MAP>(prop: K, axisOnly?: boolean, direction?: Options['direction']): typeof ORIENTATION_MAP[K][number] | K;
    resolve<R extends string>(prop: R, axisOnly?: boolean, direction?: Options['direction']): R;
    orient(value: number): number;
    left(): string;
    right(): string;
    width(): string;
}
/**
 * The translation map for directions.
 *
 * @since 3.0.0
 */
declare const ORIENTATION_MAP: {
    readonly width: readonly ["height"];
    readonly left: readonly ["top", "right"];
    readonly right: readonly ["bottom", "left"];
    readonly x: readonly ["y"];
    readonly X: readonly ["Y"];
    readonly Y: readonly ["X"];
    readonly ArrowLeft: readonly [string, string];
    readonly ArrowRight: readonly [string, string];
};

/**
 * The interface for elements which the slider consists of.
 *
 * @since 3.0.0
 */
interface ElementCollection {
    root: HTMLElement;
    track: HTMLElement;
    list: HTMLElement;
    slides: HTMLElement[];
    arrows?: HTMLElement;
    pagination?: HTMLUListElement;
    prev?: HTMLButtonElement;
    next?: HTMLButtonElement;
    bar?: HTMLElement;
    toggle?: HTMLElement;
}
/**
 * The interface for the Elements component.
 *
 * @since 3.0.0
 */
interface ElementsComponent extends BaseComponent, Readonly<ElementCollection> {
}

/**
 * The type that matches any function.
 */
declare type AnyFunction$1 = (...args: any[]) => any;

/**
 * The union for CSS properties.
 *
 * @since 0.0.1
 */
declare type CSSProperties = Exclude<keyof CSSStyleDeclaration, number | 'length' | 'parentRule' | 'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty'>;

/**
 * The type for an array with remover functions.
 *
 * @since 0.0.1
 */
declare type Removers = Set<[() => void, object?]>;
/**
 * The interface for the EventBinder instance.
 *
 * @since 0.0.1
 */
interface EventBinder {
    bind(target: EventTarget, events: string | string[], callback: AnyFunction$1, options?: AddEventListenerOptions): void;
    lock(): EventBinder;
    destroy(hard?: boolean): void;
}
/**
 * The constructor function to provide methods to subscribe native events.
 *
 * @since 0.0.1
 * @constructor
 *
 * @return An EventBinder instance.
 */
declare function EventBinder(removersRef?: Removers): EventBinder;

/**
 * The type for an array with a listener entry as `[ callback, key ]`.
 *
 * @since 0.0.1
 */
declare type Listener = [AnyFunction$1, object?];
/**
 * The collection of listeners.
 *
 * @since 0.0.1
 */
declare type Listeners = Record<string, Listener[]>;
/**
 * The interface for the EventBus instance.
 *
 * @since 0.0.1
 */
interface EventBus<M extends Record<string, AnyFunction$1> = Record<string, AnyFunction$1>> {
    on<K extends keyof M & string>(event: K, callback: M[K]): void;
    on(events: string | string[], callback: AnyFunction$1): void;
    off<K extends keyof M & string>(event: K, callback?: M[K]): void;
    off(events: string | string[], callback?: AnyFunction$1): void;
    emit<K extends keyof M & string>(event: K, ...args: Parameters<M[K]>): void;
    emit(event: string, ...args: any[]): void;
    lock(): EventBus<M>;
    destroy(hard?: boolean): void;
}
/**
 * Provides the simple event system.
 * Note that `M` - type for an event map - must have index signature,
 * but that makes all callback function `AnyFunction`.
 * To avoid this:
 * - Use a type alias instead of interface.
 * - Or do like `EventBus<EventMap & Record<string, AnyFunction>, keyof EventMap>`.
 *
 * @see https://github.com/microsoft/TypeScript/issues/15300
 *
 * @since 0.0.1
 * @constructor
 *
 * @param listenersRef
 *
 * @return An EventBus instance.
 */
declare function EventBus<M extends Record<string, AnyFunction$1>, K extends keyof M & string>(listenersRef?: Listeners): EventBus<M>;

/**
 * The interface for the EventInterface object.
 *
 * @since 0.0.1
 */
interface EventInterface$1<M extends Record<string, AnyFunction$1> = Record<string, AnyFunction$1>> extends Omit<EventBinder, 'lock'>, Omit<EventBus<M>, 'lock'> {
    lock(): EventInterface$1<M>;
    destroy(hard?: boolean): void;
}
/**
 * The constructor function that provides interface for both internal and native events.
 * Only the root `EventInterface` instance can destroy all locked instances.
 *
 * @since 0.0.1
 * @constructor
 * @internal
 *
 * @param binder - An `EventBinder` instance. Internal use only.
 * @param bus    - An `EventBus` instance. Internal use only.
 *
 * @return A collection of interface functions.
 */
declare function EventInterface$1<M extends Record<string, AnyFunction$1> = Record<string, AnyFunction$1>>(binder?: EventBinder, bus?: EventBus<Record<string, AnyFunction$1>>): EventInterface$1<M>;

/**
 * The interface for the State object.
 *
 * @since 0.0.1
 */
interface State {
    set(state: number): void;
    is(states: number | number[]): boolean;
}
/**
 * The function providing a super simple state system.
 *
 * @param initialState - Specifies the initial state.
 */
declare function State(initialState: number): State;

/**
 * The interface for the Slide sub component.
 *
 * @since 3.0.0
 */
interface SlideComponent extends BaseComponent {
    readonly index: number;
    readonly slideIndex: number;
    readonly slide: HTMLElement;
    readonly container: HTMLElement;
    readonly isClone: boolean;
    update(): void;
    style(prop: CSSProperties, value: string | number, useContainer?: boolean): void;
    isWithin(from: number, distance: number): boolean;
    isVisible(partial?: boolean): boolean;
}

/**
 * The interface for the Layout component.
 *
 * @since 3.0.0
 */
interface LayoutComponent extends BaseComponent {
    trackSize(): number;
    listSize(full?: boolean): number;
    slideSize(index: number, withoutGap?: boolean): number;
    sliderSize(withoutGap?: boolean): number;
    totalSize(index?: number, withoutGap?: boolean): number;
    getPadding(right: boolean): number;
    isOverflow(): boolean;
    /** @internal */
    resize(force?: boolean): void;
}

/**
 * The interface for the Clone component.
 *
 * @since 3.0.0
 */
interface ClonesComponent extends BaseComponent {
}

/**
 * The interface for the Move component.
 *
 * @since 3.0.0
 */
interface MoveComponent extends BaseComponent {
    move(dest: number, index: number, prev: number, forwards: boolean, callback?: AnyFunction): void;
    jump(index: number): void;
    translate(position: number, preventLoop?: boolean): void;
    shift(position: number, backwards: boolean): number;
    cancel(): void;
    toIndex(position: number): number;
    toPosition(index: number): number;
    getPosition(): number;
    getRate(index?: number): number;
    getLimit(max: boolean): number;
    exceededLimit(max?: boolean | undefined, position?: number): boolean;
    /** @internal */
    reposition(): void;
    canShift(backwards: boolean): boolean;
}

/**
 * The interface for the Controller component.
 *
 * @since 3.0.0
 */
interface ControllerComponent extends BaseComponent {
    go(control: number | string, callback?: AnyFunction): void;
    jump(control: number | string): void;
    scroll(destination: number, duration?: number, snap?: boolean, callback?: AnyFunction): void;
    getNext(destination?: boolean): number;
    getPrev(destination?: boolean): number;
    getEnd(): number;
    setIndex(index: number): void;
    getIndex(prev?: boolean): number;
    toIndex(page: number): number;
    toPage(index: number): number;
    toDest(position: number): number;
    hasFocus(): boolean;
    isBusy(): boolean;
    /** @internal */
    getAdjacent(prev: boolean, destination?: boolean): number;
}

/**
 * The interface for the Arrows component.
 *
 * @since 3.0.0
 */
interface ArrowsComponent extends BaseComponent {
    readonly arrows: {
        readonly prev?: HTMLButtonElement;
        readonly next?: HTMLButtonElement;
    };
    /** @internal */
    update(): void;
}

/**
 * The interface for the Autoplay component.
 *
 * @since 3.0.0
 */
interface AutoplayComponent extends BaseComponent {
    play(): void;
    pause(): void;
    isPaused(): boolean;
}

/**
 * The interface for the Scroll component.
 *
 * @since 3.0.0
 */
interface ScrollComponent extends BaseComponent {
    scroll(position: number, duration?: number, snap?: boolean, callback?: AnyFunction): void;
    cancel(): void;
}

/**
 * The interface for the Drag component.
 *
 * @since 3.0.0
 */
interface DragComponent extends BaseComponent {
    disable(disabled: boolean): void;
    isDragging(): boolean;
}

/**
 * The interface for the Keyboard component.
 *
 * @since 3.0.0
 */
interface KeyboardComponent extends BaseComponent {
    disable(disabled: boolean): void;
}

/**
 * The interface for the LazyLoad component.
 *
 * @since 3.0.0
 */
interface LazyLoadComponent extends BaseComponent {
    /** @internal */
    check(): void;
}

/**
 * The interface for the Pagination component.
 *
 * @since 3.0.0
 */
interface PaginationComponent extends BaseComponent {
    readonly items: PaginationItem[];
    getAt(index: number): PaginationItem;
    update(): void;
}
/**
 * The interface for data of the pagination.
 *
 * @since 3.0.0
 */
interface PaginationData {
    readonly list: HTMLUListElement;
    readonly items: PaginationItem[];
}
/**
 * The interface for each pagination item.
 *
 * @since 3.0.0
 */
interface PaginationItem {
    readonly li: HTMLLIElement;
    readonly button: HTMLButtonElement;
    readonly page: number;
}

/**
 * The interface for the Sync component.
 *
 * @since 3.0.0
 */
interface SyncComponent extends BaseComponent {
    remount(): void;
}

/**
 * The interface for the Live component.
 *
 * @since 4.0.0
 */
interface LiveComponent extends BaseComponent {
    disable(disabled: boolean): void;
}

/**
 * The collection of i18n strings.
 *
 * @since 3.0.0
 */
declare const I18N: {
    prev: string;
    next: string;
    first: string;
    last: string;
    slideX: string;
    pageX: string;
    play: string;
    pause: string;
    carousel: string;
    slide: string;
    select: string;
    slideLabel: string;
};

/**
 * The interface for options.
 *
 * @since 3.0.0
 */
interface Options extends ResponsiveOptions {
    /**
     * The type of the slider.
     * - 'slide': A slider with the slide transition
     * - 'loop' : A carousel slider
     * - 'fade' : A slider with the fade transition. This does not support the perPage option.
     */
    type?: string;
    /**
     * The `role` attribute for the root element.
     * If the tag is `<section>`, this value will not be used. The default value is `'region'`.
     */
    role?: string;
    /**
     * Determines whether to disable any actions while the slider is transitioning.
     * Even if `false`, the slider forcibly waits for transition on the loop points.
     */
    waitForTransition?: boolean;
    /**
     * If `true`, the width of slides are determined by their width.
     * The `perPage` and `perMove` options should be `1`.
     */
    autoWidth?: boolean;
    /**
     * If `true`, the height of slides are determined by their height.
     * The `perPage` and `perMove` options should be `1`.
     */
    autoHeight?: boolean;
    /**
     * The start index.
     */
    start?: number;
    /**
     * Changes the arrow SVG path, like 'm7.61 0.807-2.12...'.
     */
    arrowPath?: string;
    /**
     * Determines whether to activate autoplay or not.
     * If `paused`, it will not begin when the slider becomes active.
     * You need to provided play/pause buttons or manually start it by `Autoplay#play()`.
     */
    autoplay?: boolean | 'pause';
    /**
     * The autoplay interval in milliseconds.
     */
    interval?: number;
    /**
     * Determines whether to pause autoplay on mouseover.
     */
    pauseOnHover?: boolean;
    /**
     * Determines whether to pause autoplay when the slider contains the active element (focused element).
     * This should be `true` for accessibility.
     */
    pauseOnFocus?: boolean;
    /**
     * Determines whether to reset the autoplay progress when it is requested to start again.
     */
    resetProgress?: boolean;
    /**
     * Enables lazy loading.
     * Provide the `src` by the `data-splide-lazy` or the `srcset` by the `data-splide-lazy-srcset`.
     * You may also provide `src` for the placeholder, but the value must be different with the data.
     *
     * - `false`: Disables lazy loading
     * - `'nearby'`: Starts loading only images around the active slide (page)
     * - `'sequential'`: Loads images sequentially
     */
    lazyLoad?: boolean | 'nearby' | 'sequential';
    /**
     * Determine how many pages (not slides) around the active slide should be loaded beforehand.
     * This only works when the `lazyLoad` option is `'nearby'`.
     */
    preloadPages?: number;
    /**
     * Enables keyboard shortcuts for the slider control.
     * - `true` or `'global'`: Listens to the `keydown` event of the document.
     * - 'focused': Listens to the `keydown` event of the slider root element with adding `tabindex="0"` to it.
     * - `false`: Disables keyboard shortcuts (default).
     */
    keyboard?: boolean | 'global' | 'focused';
    /**
     * Determines whether to release the touch event when the carousel reaches the first or last slide.
     * If `true`, the bounce effect will not play.
     * Note that this does not affect mouse drag events.
     */
    releaseTouch?: boolean;
    /**
     * The direction of the slider.
     * - 'ltr': Left to right
     * - 'rtl': Right to left
     * - 'ttb': Top to bottom
     */
    direction?: 'ltr' | 'rtl' | 'ttb';
    /**
     * Determines whether to add `tabindex="0"` to visible slides or not.
     */
    slideFocus?: boolean;
    /**
     * If `true`, the slider makes slides clickable to navigate another slider.
     * Use `Splide#sync()` to sync multiple sliders.
     */
    isNavigation?: boolean;
    /**
     * Determines whether to trim spaces before/after the slider if the `focus` option is available.
     * - `true`: Trims spaces. The slider may stay on the same location even when requested to move.
     * - `'move'`: Trims spaces and forces to move the slider when requested.
     */
    trimSpace?: boolean | 'move';
    /**
     * If `true` and the `focus` option is available:
     * - Disables the next arrow when a carousel reaches the last page even if the active slide is not the last slide.
     * - Omits redundant pagination dots which just change the active slide and do not move a carousel.
     */
    omitEnd?: boolean;
    /**
     * Updates the `is-active` status of slides just before moving the slider.
     */
    updateOnMove?: boolean;
    /**
     * If `min`, the media query for breakpoints will be `min-width`, or otherwise, `max-width`.
     */
    mediaQuery?: 'min' | 'max';
    /**
     * The selector to find focusable elements
     * where `tabindex="-1"` will be assigned when their ascendant slide is hidden.
     */
    focusableNodes?: string;
    /**
     * The selector for nodes that cannot be dragged.
     */
    noDrag?: string;
    /**
     * Enables the live region by `aria-live`.
     * If `true`, screen readers will read a content of each slide whenever slide changes.
     */
    live?: boolean;
    /**
     * Determines whether to use the Transition component or not.
     */
    useScroll?: boolean;
    /**
     * Options for specific breakpoints.
     *
     * @example
     * ```ts
     * {
     *   1000: {
     *     perPage: 3,
     *     gap    : 20
     *   },
     *   600: {
     *     perPage: 1,
     *     gap    : 5,
     *   },
     * }
     * ```
     */
    breakpoints?: Record<string | number, ResponsiveOptions>;
    /**
     * Options used when the `(prefers-reduced-motion: reduce)` is detected.
     */
    reducedMotion?: Options;
    /**
     * The collection of class names.
     */
    classes?: Record<string, string>;
    /**
     * The collection of i18n strings.
     */
    i18n?: Record<keyof typeof I18N | string, string>;
}
/**
 * The interface for options that can correspond with breakpoints.
 *
 * @since 3.0.0
 */
interface ResponsiveOptions {
    /**
     * Accepts arbitrary properties for extensions, although it's not ideal typing.
     */
    [key: string]: any;
    /**
     * The label for the root element.
     * Use `labelledby` instead if there is a visible label.
     */
    label?: string;
    /**
     * The ID for the element that used as the label of the carousel.
     */
    labelledby?: string;
    /**
     * The transition speed in milliseconds.
     */
    speed?: number;
    /**
     * Determines whether to rewind the carousel or not.
     * This is ignored when the `type` option is `'loop'`.
     */
    rewind?: boolean;
    /**
     * The transition speed on rewind in milliseconds.
     */
    rewindSpeed?: number;
    /**
     * Allows to rewind a carousel by drag if the `rewind` option is enabled.
     */
    rewindByDrag?: boolean;
    /**
     * Defines the slider max width, accepting the CSS format such as 10em, 80vw.
     */
    width?: number | string;
    /**
     * Defines the slider height, accepting the CSS format.
     */
    height?: number | string;
    /**
     * Fixes width of slides, accepting the CSS format.
     * The slider will ignore the `perPage` option if you provide this value.
     */
    fixedWidth?: number | string;
    /**
     * Fixes height of slides, accepting the CSS format.
     * The slider will ignore the `heightRatio` option if you provide this value.
     */
    fixedHeight?: number | string;
    /**
     * Determines height of slides by the ratio to the slider width.
     * For example, when the slider width is `1000` and the ratio is `0.5`, the height will be `500`.
     */
    heightRatio?: number;
    /**
     * Determines the number of slides to display in a page.
     */
    perPage?: number;
    /**
     * Determines the number of slides to move at once.
     */
    perMove?: number;
    /**
     * Determine the number of clones on each side of the slider.
     * In most cases, you don't need to provide this value.
     */
    clones?: number;
    /**
     * Determines whether to clone status classes for clones or not.
     */
    cloneStatus?: boolean;
    /**
     * Determines which slide should be active if there are multiple slides in a page.
     * Numbers and `'center'` are acceptable.
     */
    focus?: number | 'center';
    /**
     * The gap between slides. The CSS format is acceptable, such as `1em`.
     */
    gap?: number | string;
    /**
     * Sets padding left/right or top/bottom of the slider.
     * The CSS format is acceptable, such as `1em`.
     *
     * @example
     * ```ts
     * // By number
     * padding: 10,
     *
     * // By the CSS format
     * padding: '1rem',
     *
     * // Specifies each value for a horizontal slider
     * padding: { left: 10, right: 20 },
     * padding: { left: '1rem', right: '2rem' },
     *
     * // Specified each value for a vertical slider
     * padding: { top: 10, bottom: 20 },
     * ```
     */
    padding?: number | string | {
        left?: number | string;
        right?: number | string;
    } | {
        top?: number | string;
        bottom?: number | string;
    };
    /**
     * Determines whether to create/find arrows or not.
     */
    arrows?: boolean;
    /**
     * Determines whether to create pagination (indicator dots) or not.
     */
    pagination?: boolean;
    /**
     * Determines whether to enable keyboard shortcuts for pagination when it contains focus.
     * The default value is `true`.
     */
    paginationKeyboard?: boolean;
    /**
     * Explicitly sets the pagination direction that does not only affect appearance but also shortcuts and ARIA attributes.
     * The default value is same with the carousel direction.
     */
    paginationDirection?: Options['direction'];
    /**
     * The timing function for the CSS transition. For example, `linear`, ease or `cubic-bezier()`.
     */
    easing?: string;
    /**
     * The easing function for the drag free mode.
     * The default function is the `easeOutQuart` interpolation.
     */
    easingFunc?: (t: number) => number;
    /**
     * Allows to drag the slider by a mouse or swipe.
     * If `free`, the slider does not snap to a slide after drag.
     */
    drag?: boolean | 'free';
    /**
     * Snaps the closest slide in the drag-free mode.
     */
    snap?: boolean;
    /**
     * The required distance to start moving the slider by the touch action.
     * If you want to define the threshold for the mouse, provide an object.
     */
    dragMinThreshold?: number | {
        mouse: number;
        touch: number;
    };
    /**
     * Determine the power of "flick". The larger number this is, the farther the slider runs.
     * Around 500 is recommended.
     */
    flickPower?: number;
    /**
     * Limits the number of pages to move by "flick".
     */
    flickMaxPages?: number;
    /**
     * Determines whether to release the touch event when the carousel reaches the first or last slide.
     * If `true`, the bounce effect will not play.
     * Note that this does not affect mouse drag events.
     */
    releaseTouch?: boolean;
    /**
     * If `drag` is `'free'`, determines whether to activate the closest slide after drag or not.
     * The default value is `true`.
     */
    updateOnDragged?: boolean;
    /**
     * Destroys the slider.
     */
    destroy?: boolean | 'completely';
}

declare const EVENT_MOUNTED = "mounted";
declare const EVENT_READY = "ready";
declare const EVENT_MOVE = "move";
declare const EVENT_MOVED = "moved";
declare const EVENT_CLICK = "click";
declare const EVENT_ACTIVE = "active";
declare const EVENT_INACTIVE = "inactive";
declare const EVENT_VISIBLE = "visible";
declare const EVENT_HIDDEN = "hidden";
declare const EVENT_REFRESH = "refresh";
declare const EVENT_UPDATED = "updated";
declare const EVENT_RESIZE = "resize";
declare const EVENT_RESIZED = "resized";
declare const EVENT_DRAG = "drag";
declare const EVENT_DRAGGING = "dragging";
declare const EVENT_DRAGGED = "dragged";
declare const EVENT_SCROLL = "scroll";
declare const EVENT_SCROLLING = "scrolling";
declare const EVENT_SCROLLED = "scrolled";
declare const EVENT_OVERFLOW = "overflow";
declare const EVENT_DESTROY = "destroy";
declare const EVENT_ARROWS_MOUNTED = "arrows:mounted";
declare const EVENT_ARROWS_UPDATED = "arrows:updated";
declare const EVENT_PAGINATION_MOUNTED = "pagination:mounted";
declare const EVENT_PAGINATION_UPDATED = "pagination:updated";
declare const EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
declare const EVENT_AUTOPLAY_PLAY = "autoplay:play";
declare const EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
declare const EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
declare const EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
declare const EVENT_LAZYLOAD_ERROR = "lazyload:error";
/** @internal */
declare const EVENT_SLIDE_KEYDOWN = "_sk";
declare const EVENT_SHIFTED = "_sh";
declare const EVENT_END_INDEX_CHANGED = "_ei";

/**
 * The interface for all internal E.
 *
 * @since 3.0.0
 */
interface EventMap {
    [EVENT_MOUNTED]: () => void;
    [EVENT_READY]: () => void;
    [EVENT_CLICK]: (Slide: SlideComponent, e: MouseEvent) => void;
    [EVENT_MOVE]: (index: number, prev: number, dest: number) => void;
    [EVENT_MOVED]: (index: number, prev: number, dest: number) => void;
    [EVENT_ACTIVE]: (Slide: SlideComponent) => void;
    [EVENT_INACTIVE]: (Slide: SlideComponent) => void;
    [EVENT_VISIBLE]: (Slide: SlideComponent) => void;
    [EVENT_HIDDEN]: (Slide: SlideComponent) => void;
    [EVENT_REFRESH]: () => void;
    [EVENT_UPDATED]: (options: Options) => void;
    [EVENT_RESIZE]: () => void;
    [EVENT_RESIZED]: () => void;
    [EVENT_DRAG]: () => void;
    [EVENT_DRAGGING]: () => void;
    [EVENT_DRAGGED]: () => void;
    [EVENT_SCROLL]: () => void;
    [EVENT_SCROLLING]: () => void;
    [EVENT_SCROLLED]: () => void;
    [EVENT_OVERFLOW]: (overflow: boolean) => void;
    [EVENT_DESTROY]: () => void;
    [EVENT_ARROWS_MOUNTED]: (prev: HTMLButtonElement, next: HTMLButtonElement) => void;
    [EVENT_ARROWS_UPDATED]: (prev: HTMLButtonElement, next: HTMLButtonElement, prevIndex: number, nextIndex: number) => void;
    [EVENT_PAGINATION_MOUNTED]: (data: PaginationData, item: PaginationItem) => void;
    [EVENT_PAGINATION_UPDATED]: (data: PaginationData, prev: PaginationItem, curr: PaginationItem) => void;
    [EVENT_NAVIGATION_MOUNTED]: (splides: Splide[]) => void;
    [EVENT_AUTOPLAY_PLAY]: () => void;
    [EVENT_AUTOPLAY_PLAYING]: (rate: number) => void;
    [EVENT_AUTOPLAY_PAUSE]: () => void;
    [EVENT_LAZYLOAD_LOADED]: (img: HTMLImageElement, Slide: SlideComponent) => void;
    [EVENT_LAZYLOAD_ERROR]: (img: HTMLImageElement, Slide: SlideComponent) => void;
    /** @internal */
    [EVENT_SLIDE_KEYDOWN]: (Slide: SlideComponent, e: KeyboardEvent) => void;
    [EVENT_SHIFTED]: () => void;
    [EVENT_END_INDEX_CHANGED]: () => void;
}
/**
 * The EventInterface type with Splide `EventMap`.
 *
 * @since 5.0.0
 */
type EventInterface = EventInterface$1<EventMap & Record<string, AnyFunction>>;

/**
 * The type for any function.
 *
 * @since 3.0.0
 */
type AnyFunction = (...args: any[]) => any;
/**
 * The type for a component.
 *
 * @since 3.0.0
 */
type ComponentConstructor<R extends BaseComponent = BaseComponent> = (Splide: Splide, Components: Components, options: Options, event: EventInterface) => R;
/**
 * The interface for any component.
 *
 * @since 3.0.0
 */
interface BaseComponent {
    setup?(): void;
    mount?(): void;
    destroy?(completely?: boolean): void;
}
/**
 * The interface for the Transition component.
 *
 * @since 3.0.0
 */
interface TransitionComponent extends BaseComponent {
    start(index: number, done: () => void): void;
    cancel(): void;
}
/**
 * The interface for info of a splide instance to sync with.
 *
 * @since 3.2.8
 */
interface SyncTarget {
    splide: Splide;
    isParent?: boolean;
}

/**
 * The interface for all components.
 *
 * @since 3.0.0
 */
interface Components {
    [key: string]: BaseComponent | undefined;
    Breakpoints: BreakpointsComponent;
    Direction: DirectionComponent;
    Elements: ElementsComponent;
    Slides: SlidesComponent;
    Layout: LayoutComponent;
    Clones: ClonesComponent;
    Move: MoveComponent;
    Controller: ControllerComponent;
    Arrows: ArrowsComponent;
    Autoplay: AutoplayComponent;
    Scroll: ScrollComponent;
    Drag: DragComponent;
    Keyboard: KeyboardComponent;
    LazyLoad: LazyLoadComponent;
    Pagination: PaginationComponent;
    Sync: SyncComponent;
    Live: LiveComponent;
    Transition: TransitionComponent;
}

/**
 * Casts T to U.
 *
 * @internal
 */
type Cast<T, U> = T extends U ? T : U;
/**
 * Makes the T easy to read.
 */
type Resolve<T> = {
    [K in keyof T]: T[K];
} & unknown;
/**
 * Pushes U to tuple T.
 *
 * @internal
 */
type Push<T extends any[], U = any> = [...T, U];
/**
 * Returns the first type of the tuple.
 *
 * @internal
 */
type Head<T extends any[]> = ((...args: T) => any) extends (arg: infer A, ...args: any[]) => any ? A : never;
/**
 * Removes the first type from the tuple T.
 *
 * @internal
 */
type Shift<T extends any[]> = ((...args: T) => any) extends (arg: any, ...args: infer A) => any ? A : never;
/**
 * Removes the N types from the tuple T.
 *
 * @internal
 */
type ShiftN<T extends any[], N extends number, C extends any[] = []> = {
    0: T;
    1: ShiftN<Shift<T>, N, Push<C>>;
}[C['length'] extends N ? 0 : 1] extends infer A ? Cast<A, any[]> : never;

/**
 * The interface for the Slides component.
 *
 * @since 3.0.0
 */
interface SlidesComponent extends BaseComponent {
    update(): void;
    register(slide: HTMLElement, index: number, slideIndex: number): void;
    get(excludeClones?: boolean): SlideComponent[];
    getIn(page: number): SlideComponent[];
    getAt(index: number): SlideComponent | undefined;
    add(slide: string | Element | Array<string | Element>, index?: number): void;
    remove(selector: SlideMatcher): void;
    forEach(iteratee: SlidesIteratee, excludeClones?: boolean): void;
    filter(matcher: SlideMatcher): SlideComponent[];
    style(prop: string, value: string | number, useContainer?: boolean): void;
    getLength(excludeClones?: boolean): number;
    isEnough(): boolean;
}
/**
 * The iteratee function for Slides.
 *
 * @since 3.0.0
 */
type SlidesIteratee = (Slide: SlideComponent, index: number, Slides: SlideComponent[]) => void;
/**
 * The predicate function for Slides.
 *
 * @since 3.0.0
 */
type SlidesPredicate = (Slide: SlideComponent, index: number, Slides: SlideComponent[]) => any;
/**
 * The type for filtering SlideComponent objects.
 *
 * @since 3.0.0
 */
type SlideMatcher = number | number[] | string | SlidesPredicate;

/**
 * The frontend class for the Splide slider.
 *
 * @since 3.0.0
 */
declare class Splide {
    /**
     * Changes the default options for all Splide instances.
     */
    static defaults: Options;
    /**
     * The collection of state numbers.
     */
    static readonly STATES: {
        CREATED: number;
        MOUNTED: number;
        IDLE: number;
        MOVING: number;
        SCROLLING: number;
        DRAGGING: number;
        DESTROYED: number;
    };
    /**
     * Stores extension constructors.
     */
    static readonly Extensions: Record<string, ComponentConstructor>;
    /**
     * The root element where the Splide is applied.
     */
    readonly root: HTMLElement;
    /**
     * The EventInterface object.
     */
    readonly event: EventInterface$1<EventMap & Record<string, AnyFunction>>;
    /**
     * The collection of all component instances, including extensions.
     */
    readonly Components: Components;
    /**
     * The StateObject object.
     */
    readonly state: State;
    /**
     * An array with SyncTarget objects for splide instances to sync with.
     */
    readonly splides: SyncTarget[];
    /**
     * The current options.
     */
    private readonly _o;
    /**
     * The collection of all components.
     */
    private _C;
    /**
     * The collection of extensions.
     */
    private _E;
    /**
     * The Transition component.
     */
    private _T;
    /**
     * The Splide constructor.
     *
     * @param target  - The selector for the target element, or the element itself.
     * @param options - Optional. An object with options.
     */
    constructor(target: string | HTMLElement, options?: Options);
    /**
     * Initializes the instance.
     *
     * @param Extensions - Optional. An object with extensions.
     * @param Transition - Optional. A Transition component.
     *
     * @return `this`
     */
    mount(Extensions?: Record<string, ComponentConstructor>, Transition?: ComponentConstructor): this;
    /**
     * Syncs the slider with the provided one.
     * This method must be called before the `mount()`.
     *
     * @example
     * ```ts
     * const primary   = new Splide();
     * const secondary = new Splide();
     *
     * primary.sync( secondary );
     * primary.mount();
     * secondary.mount();
     * ```
     *
     * @param splide - A Splide instance to sync with.
     *
     * @return `this`
     */
    sync(splide: Splide): this;
    /**
     * Moves the carousel with the following control pattern.
     *
     * | Pattern | Description |
     * |---|---|
     * | `i` | Goes to the slide `i` |
     * | `'+${i}'` | Increments the slide index by `i` |
     * | `'-${i}'` | Decrements the slide index by `i` |
     * | `'>'` | Goes to the next page |
     * | `'<'` | Goes to the previous page |
     * | `>${i}` | Goes to the page `i` |
     * | `>>` | Goes to the first page |
     * | `<<` | Goes to the last page |
     *
     * In most cases, `'>'` and `'<'` notations are enough to control the slider
     * because they respect `perPage` and `perMove` options.
     *
     * @example
     * ```ts
     * const splide = new Splide();
     *
     * // Goes to the slide 1:
     * splide.go( 1 );
     *
     * // Increments the index:
     * splide.go( '+2' );
     *
     * // Goes to the next page:
     * splide.go( '>' );
     *
     * // Goes to the page 2:
     * splide.go( '>2' );
     * ```
     *
     * @param control - A control pattern.
     *
     * @return `this`
     */
    go(control: number | string): this;
    /**
     * Moves the carousel without transition.
     *
     * @param control - A control pattern. See `move()` for more details.
     *
     * @return `this`
     */
    jump(control: number | string): this;
    /**
     * Registers an event handler.
     *
     * @example
     * ```ts
     * const splide = new Splide();
     *
     * // Listens to a single event:
     * splide.on( 'move', function() {} );
     *
     * // Listens to multiple events:
     * splide.on( 'move resize', function() {} );
     *
     * // Appends a namespace:
     * splide.on( 'move.myNamespace resize.myNamespace', function() {} );
     * ```
     *
     * @param events   - An event name or names separated by spaces. Use a dot(.) to append a namespace.
     * @param callback - A callback function.
     *
     * @return `this`
     */
    on<K extends keyof EventMap>(events: K, callback: EventMap[K]): this;
    on(events: string | string[], callback: AnyFunction): this;
    /**
     * Removes the registered all handlers for the specified event or events.
     * If you want to only remove a particular handler, use namespace to identify it.
     *
     * @example
     * ```ts
     * const splide = new Splide();
     *
     * // Removes all handlers assigned to "move":
     * splide.off( 'move' );
     *
     * // Only removes handlers that belong to the specified namespace:
     * splide.off( 'move.myNamespace' );
     * ```
     *
     * @param events   - An event name or names separated by spaces. Use a dot(.) to append a namespace.
     * @param callback - A callback function to remove.
     *
     * @return `this`
     */
    off<K extends keyof EventMap>(events: K | K[] | string | string[], callback: AnyFunction): this;
    /**
     * Emits an event and triggers registered handlers.
     *
     * @param event - An event name to emit.
     * @param args  - Optional. Any number of arguments to pass to handlers.
     *
     * @return `this`
     */
    emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): this;
    emit(event: string, ...args: any[]): this;
    /**
     * Inserts a slide at the specified position.
     *
     * @example
     * ```ts
     * const splide = new Splide();
     * splide.mount();
     *
     * // Adds the slide by the HTML:
     * splide.add( '<li></li> );
     *
     * // or adds the element:
     * splide.add( document.createElement( 'li' ) );
     * ```
     *
     * @param slides - A slide element, an HTML string that represents a slide, or an array with them.
     * @param index  - Optional. An index to insert a slide at.
     *
     * @return `this`
     */
    add(slides: string | HTMLElement | Array<string | HTMLElement>, index?: number): this;
    /**
     * Removes slides that match the matcher
     * that can be an index, an array with indices, a selector, or an iteratee function.
     *
     * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
     */
    remove(matcher: SlideMatcher): this;
    /**
     * Checks the slider type.
     *
     * @param type - A type to test.
     *
     * @return `true` if the type matches the current one, or otherwise `false`.
     */
    is(type: string): boolean;
    /**
     * Refreshes the slider.
     *
     * @return `this`
     */
    refresh(): this;
    /**
     * Destroys the slider.
     *
     * @param completely - Optional. If `true`, Splide will not remount the slider by breakpoints.
     *
     * @return `this`
     */
    destroy(completely?: boolean): this;
    /**
     * Returns options.
     *
     * @return An object with the latest options.
     */
    get options(): Options;
    /**
     * Merges options to the current options and emits `updated` event.
     *
     * @param options - An object with new options.
     */
    set options(options: Options);
    /**
     * Returns the number of slides without clones.
     *
     * @return The number of slides.
     */
    get length(): number;
    /**
     * Returns the active slide index.
     *
     * @return The active slide index.
     */
    get index(): number;
}

/**
 * The interface for the content of each slide.
 *
 * @since 3.0.0
 */
interface SlideContent {
    /**
     * The HTML or text for each slide.
     */
    html?: string;
    /**
     * The collection of styles. They will remain after Splide is applied.
     */
    styles?: Record<string, string | number>;
    /**
     * The collection of attributes. They will remain after Splide is applied.
     */
    attrs?: Record<string, string | number | boolean>;
}
/**
 * The interface for the config of the renderer.
 *
 * @since 3.0.0
 */
interface RendererConfig {
    /**
     * The slider ID.
     */
    id?: string;
    /**
     * The additional class for the root element.
     */
    rootClass?: string;
    /**
     * The tag used for the list element.
     */
    listTag?: string;
    /**
     * The tag used for each slide.
     */
    slideTag?: string;
    /**
     * Determines whether to render arrows or not.
     */
    arrows?: boolean;
    /**
     * Keeps the slider hidden.
     */
    hidden?: boolean;
    /**
     * Determines whether to wrap the track by the slider element or not.
     */
    slider?: boolean;
    /**
     * The additional HTML rendered before the slider element.
     */
    beforeSlider?: string;
    /**
     * The additional HTML rendered after the slider element.
     */
    afterSlider?: string;
    /**
     * The additional HTML rendered before the track element.
     */
    beforeTrack?: string;
    /**
     * The additional HTML rendered after the track element.
     */
    afterTrack?: string;
}

/**
 * The class to generate static HTML of the slider for the first view.
 *
 * @since 3.0.0
 */
declare class SplideRenderer {
    /**
     * Removes a style element and clones.
     *
     * @param splide - A Splide instance.
     */
    static clean(splide: Splide): void;
    /**
     * Holds slide contents.
     */
    private readonly contents;
    /**
     * Stores data of slides.
     */
    private readonly slides;
    /**
     * The Direction component.
     */
    private readonly Direction;
    /**
     * Holds the Style instance.
     */
    private readonly Style;
    /**
     * Holds options.
     */
    private readonly options;
    /**
     * Holds options for this instance.
     */
    private readonly config;
    /**
     * The slider ID.
     */
    private readonly id;
    /**
     * An array with options for each breakpoint.
     */
    private readonly breakpoints;
    /**
     * The SplideRenderer constructor.
     *
     * @param contents - An array with slide contents. Each item must be an HTML or a plain text.
     * @param options  - Optional. Slider options.
     * @param config   - Static default options.
     * @param defaults - Default options for the slider. Pass `Splide.defaults` if you are using it.
     */
    constructor(contents: string[] | SlideContent[], options?: Options, config?: RendererConfig, defaults?: Options);
    /**
     * Initializes the instance.
     */
    private init;
    /**
     * Initializes slides.
     */
    private initSlides;
    /**
     * Registers styles for the root element.
     */
    private registerRootStyles;
    /**
     * Registers styles for the track element.
     */
    private registerTrackStyles;
    /**
     * Registers styles for the list element.
     */
    private registerListStyles;
    /**
     * Registers styles for slides and clones.
     */
    private registerSlideStyles;
    /**
     * Builds multiple `translateX` for the list element.
     *
     * @param options - Options for each breakpoint.
     *
     * @return A string with multiple translate functions.
     */
    private buildTranslate;
    /**
     * Returns offset for the list element.
     * This does not include gaps because it can not be converted into percent.
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset.
     */
    private cssOffsetClones;
    /**
     * Returns offset for centering the active slide.
     *
     * Note:
     * ( 100% + gap ) / perPage - gap
     * 100% / perPage + gap / perPage - gap;
     * 50% / perPage + ( gap / perPage - gap ) / 2;
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset.
     */
    private cssOffsetCenter;
    /**
     * Returns offset for gaps.
     *
     * @param options - Options for each breakpoint.
     *
     * @return The offset as `calc()`.
     */
    private cssOffsetGaps;
    /**
     * Resolves the prop for the current direction and converts it into the Kebab case.
     *
     * @param prop - A property name to resolve.
     *
     * @return A resolved property name in the Kebab case.
     */
    private resolve;
    /**
     * Returns padding in the CSS format.
     *
     * @param options - Options.
     * @param right   - Determines whether to get padding right or left.
     *
     * @return Padding in the CSS format.
     */
    private cssPadding;
    /**
     * Returns height of the track element in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    private cssTrackHeight;
    /**
     * Returns height provided though options in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    private cssHeight;
    /**
     * Returns width of each slide in the CSS format.
     *
     * @param options - Options.
     *
     * @return Width in the CSS format.
     */
    private cssSlideWidth;
    /**
     * Returns height of each slide in the CSS format.
     *
     * @param options - Options.
     *
     * @return Height in the CSS format.
     */
    private cssSlideHeight;
    /**
     * Returns width or height of each slide in the CSS format, considering the current direction.
     *
     * @param options - Options.
     *
     * @return Width or height in the CSS format.
     */
    private cssSlideSize;
    /**
     * Returns the aspectRatio value to simulate the `heightRatio` option.
     *
     * @param options - Options.
     *
     * @return aspectRatio in the CSS format.
     */
    private cssAspectRatio;
    /**
     * Builds the css value by the provided value and unit.
     *
     * @param value - A value.
     * @param unit  - A CSS unit.
     *
     * @return A built value for a CSS value.
     */
    private buildCssValue;
    /**
     * Parses the CSS value into number and unit.
     *
     * @param value - A value to parse.
     *
     * @return An object with value and unit.
     */
    private parseCssValue;
    /**
     * Parses breakpoints and generate options for each breakpoint.
     */
    private parseBreakpoints;
    /**
     * Checks if the slide width is fixed or not.
     *
     * @return `true` if the slide width is fixed, or otherwise `false`.
     */
    private isFixedWidth;
    /**
     * Checks if the slider type is loop or not.
     *
     * @return `true` if the slider type is loop, or otherwise `false`.
     */
    private isLoop;
    /**
     * Checks if the active slide should be centered or not.
     *
     * @return `true` if the slide should be centered, or otherwise `false`.
     */
    private isCenter;
    /**
     * Checks if the direction is TTB or not.
     *
     * @return `true` if the direction is TTB, or otherwise `false`.
     */
    private isVertical;
    /**
     * Builds classes of the root element.
     *
     * @return Classes for the root element as a single string.
     */
    private buildClasses;
    /**
     * Converts provided attributes into a single string.
     *
     * @param attrs - An object with attributes.
     *
     * @return A built string.
     */
    private buildAttrs;
    /**
     * Converts provided styles into a single string.
     *
     * @param styles - An object with styles.
     *
     * @return A built string.
     */
    private buildStyles;
    /**
     * Generates HTML of slides with inserting provided contents.
     *
     * @return The HTML for all slides and clones.
     */
    private renderSlides;
    /**
     * Add the `background` style for the cover mode.
     *
     * @param content - A slide content.
     */
    private cover;
    /**
     * Generates clones.
     *
     * @param contents - An array with SlideContent objects.
     */
    private generateClones;
    /**
     * Returns the number of clones to generate.
     *
     * @return A number of clones.
     */
    private getCloneCount;
    /**
     * Generates arrows and the wrapper element.
     *
     * @return The HTML for arrows.
     */
    private renderArrows;
    /**
     * Generates an arrow HTML.
     * Some attributes are temporary, and Splide changes them after mount.
     *
     * @param prev - Options for each breakpoint.
     *
     * @return The HTML for the prev or next arrow.
     */
    private renderArrow;
    /**
     * Returns the HTML of the slider.
     *
     * @return The generated HTML.
     */
    html(): string;
}

/**
 * The prefix for classes.
 *
 * @since 4.1.0
 */
declare const CLASS_PREFIX: string;
/**
 * The prefix for status classes.
 *
 * @since 4.1.0
 */
declare const STATUS_CLASS_PREFIX = "is-";
/**
 * All classes as constants.
 */
declare const CLASS_ROOT = "splide";
declare const CLASS_TRACK: string;
declare const CLASS_LIST: string;
declare const CLASS_SLIDE: string;
declare const CLASS_CLONE: string;
declare const CLASS_CONTAINER: string;
declare const CLASS_ARROWS: string;
declare const CLASS_ARROW: string;
declare const CLASS_ARROW_PREV: string;
declare const CLASS_ARROW_NEXT: string;
declare const CLASS_PAGINATION: string;
declare const CLASS_PAGINATION_PAGE: string;
declare const CLASS_PROGRESS: string;
declare const CLASS_PROGRESS_BAR: string;
declare const CLASS_TOGGLE: string;
declare const CLASS_TOGGLE_PLAY: string;
declare const CLASS_TOGGLE_PAUSE: string;
declare const CLASS_SPINNER: string;
declare const CLASS_SR: string;
declare const CLASS_INITIALIZED: string;
declare const CLASS_ACTIVE: string;
declare const CLASS_PREV: string;
declare const CLASS_NEXT: string;
declare const CLASS_VISIBLE: string;
declare const CLASS_LOADING: string;
declare const CLASS_FOCUS_IN: string;
declare const CLASS_OVERFLOW: string;
/**
 * The array with all status classes except for `is-initialized`.
 *
 * @since 3.0.0
 */
declare const STATUS_CLASSES: string[];
/**
 * The collection of classes for elements that Splide dynamically creates.
 *
 * @since 3.0.0
 */
declare const CLASSES: {
    slide: string;
    clone: string;
    arrows: string;
    arrow: string;
    prev: string;
    next: string;
    pagination: string;
    page: string;
    spinner: string;
};

/**
 * The collection of default options.
 * Note that this collection does not contain all options.
 *
 * @since 3.0.0
 */
declare const DEFAULTS: Options;

/**
 * Enumerates slides from left to right.
 */
declare const LTR = "ltr";
/**
 * Enumerates slides from right to left.
 */
declare const RTL = "rtl";
/**
 * Enumerates slides in a col.
 */
declare const TTB = "ttb";

/**
 * The type for the regular slider.
 *
 * @since 3.0.0
 */
declare const SLIDE = "slide";
/**
 * The type for the carousel slider.
 *
 * @since 3.0.0
 */
declare const LOOP = "loop";
/**
 * The type for the fade slider that can not have multiple slides in a page.
 *
 * @since 3.0.0
 */
declare const FADE = "fade";

/**
 * The collection of all states.
 *
 * @since 3.0.0
 */
declare const STATES: {
    CREATED: number;
    MOUNTED: number;
    IDLE: number;
    MOVING: number;
    SCROLLING: number;
    DRAGGING: number;
    DESTROYED: number;
};

export { AnyFunction, ArrowsComponent, AutoplayComponent, BaseComponent, BreakpointsComponent, CLASSES, CLASS_ACTIVE, CLASS_ARROW, CLASS_ARROWS, CLASS_ARROW_NEXT, CLASS_ARROW_PREV, CLASS_CLONE, CLASS_CONTAINER, CLASS_FOCUS_IN, CLASS_INITIALIZED, CLASS_LIST, CLASS_LOADING, CLASS_NEXT, CLASS_OVERFLOW, CLASS_PAGINATION, CLASS_PAGINATION_PAGE, CLASS_PREFIX, CLASS_PREV, CLASS_PROGRESS, CLASS_PROGRESS_BAR, CLASS_ROOT, CLASS_SLIDE, CLASS_SPINNER, CLASS_SR, CLASS_TOGGLE, CLASS_TOGGLE_PAUSE, CLASS_TOGGLE_PLAY, CLASS_TRACK, CLASS_VISIBLE, Cast, ClonesComponent, ComponentConstructor, Components, ControllerComponent, DEFAULTS, DirectionComponent, DragComponent, EVENT_ACTIVE, EVENT_ARROWS_MOUNTED, EVENT_ARROWS_UPDATED, EVENT_AUTOPLAY_PAUSE, EVENT_AUTOPLAY_PLAY, EVENT_AUTOPLAY_PLAYING, EVENT_CLICK, EVENT_DESTROY, EVENT_DRAG, EVENT_DRAGGED, EVENT_DRAGGING, EVENT_END_INDEX_CHANGED, EVENT_HIDDEN, EVENT_INACTIVE, EVENT_LAZYLOAD_ERROR, EVENT_LAZYLOAD_LOADED, EVENT_MOUNTED, EVENT_MOVE, EVENT_MOVED, EVENT_NAVIGATION_MOUNTED, EVENT_OVERFLOW, EVENT_PAGINATION_MOUNTED, EVENT_PAGINATION_UPDATED, EVENT_READY, EVENT_REFRESH, EVENT_RESIZE, EVENT_RESIZED, EVENT_SCROLL, EVENT_SCROLLED, EVENT_SCROLLING, EVENT_SHIFTED, EVENT_SLIDE_KEYDOWN, EVENT_UPDATED, EVENT_VISIBLE, ElementsComponent, EventInterface, EventMap, FADE, Head, KeyboardComponent, LOOP, LTR, LayoutComponent, LazyLoadComponent, LiveComponent, MoveComponent, Options, PaginationComponent, PaginationData, PaginationItem, Push, RTL, Resolve, ResponsiveOptions, SLIDE, STATES, STATUS_CLASSES, STATUS_CLASS_PREFIX, ScrollComponent, Shift, ShiftN, SlideComponent, SlidesComponent, Splide, SplideRenderer, SyncComponent, SyncTarget, TTB, TransitionComponent, Splide as default };

import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/auth/_services/auth.service';
import { LocalStorageService } from 'src/app/core/auth/_services/local-storage.service';
import { SocketClientService, ObjectIDManager } from 'src/app/core/service/service-model/socket-client.service';
import { StompService, Payload } from 'src/app/core/service/service-model/stomp.service';

@Component({
  selector: 'kt-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {
  // Public variables
  selfLayout = 'default';
  asideSelfDisplay = true;
  contentClasses = '';
  contentContainerClasses = '';
  subheaderDisplay = true;
  contentExtended = false;

  screenHeight:any;
  screenWidth:any;
  mobile = false;
  desktop = false;

  // Private properties
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/



  /**
   * Component constructor
   *
   * param layoutConfigService: LayoutConfigService
   * param menuConfigService: MenuConfigService
   * param pageConfigService: PageConfigService
   * param htmlClassService: HtmlClassService
   * param store
   * param permissionsService
   */

  isChoose = true;

  url = '';

  currentUser = this.localStorageService.get(this.localStorageService.CURRENT_USER) as UserModel;

  codeStudentRes:string;

  notifies$ = this.socketClientService.notify$.pipe(
    map((packet) => {
      const data = [
        ...packet.lesson.map(lesson => {
          const dateTime = lesson.startDateLesson.split(',', 2);
          return {
            ...lesson,
            type: 'lesson',
            startDateLesson: transformDateOfWeek(dateTime[0], this.translate) + ', ' + dateTime[1]
          }
        }),
        ...packet.exam.map(exam => {
          const dateTime = exam.startDateExam.split(',', 2);
          return {
            ...exam,
            type: 'exam',
            startDateExam: transformDateOfWeek(dateTime[0], this.translate) + ', ' + dateTime[1]
          }
        })
      ];

      return data.reduce((result, current, i) => {
        if (current.teacherCode === this.currentUser.login) {
          result.push({show: true, data: current, type: current.type} as Notify);
        }
        return result;
      }, [])
    })
  );

  notifiesStudent$ = this.socketClientService.notifyStudent$.pipe(
    map((packet) => {
      const data = [
        ...packet.lesson.map(lesson => {
          const dateTime = lesson.startDateLesson.split(',', 2);
          return {
            ...lesson,
            type: 'lesson',
            startDateLesson: transformDateOfWeek(dateTime[0], this.translate) + ', ' + dateTime[1]
          }
        }),
        ...packet.exam.map(exam => {
          const dateTime = exam.startDateExam.split(',', 2);
          return {
            ...exam,
            type: 'exam',
            startDateExam: transformDateOfWeek(dateTime[0], this.translate) + ', ' + dateTime[1]
          }
        })
      ];

      return data.reduce((result, current, i) => {
        console.log('vao day chua ha',current)
        this.codeStudentRes = current.studentCode;
        if (current.studentCode === this.currentUser.login) {
          result.push({show: true, data: current, type: current.type} as unknown as Notify);
        }
        return result;
      }, [])
    })
  );

  constructor(
    private layoutConfigService: LayoutConfigService,
    private menuConfigService: MenuConfigService,
    private pageConfigService: PageConfigService,
    private htmlClassService: HtmlClassService,
    private permissionsService: NgxPermissionsService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private socketClientService: SocketClientService,
    private courseLessonService: CourseLessonService,
    private proctorRoomService: ProctorRoomsService,
    private stompService: StompService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private readonly destroy$: DestroyService,
  private dataService: DataToBreakScrumService,
  ) {

    console.log('da vao day --------------------------');

    this.onResize();
    this.checkSocketConnect();

    // this.loadRolesWithPermissions();

    // register configs by demos
    this.layoutConfigService.loadConfigs(new LayoutConfig().configs);

    // let menuItems = new MenuConfig().configs;
    // menuItems.aside.items = menuItems.aside.items.concat(new MenuConfig().configsUser.aside.items)
    // console.log('menuItems', menuItems);
    // this.menuConfigService.loadConfigs(menuItems);

    // this.menuConfigService.loadConfigs(new MenuConfig().configs);
    this.pageConfigService.loadConfigs(new PageConfig().configs);

    // setup element classes
    this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

    const subscription = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
      // reset body class based on global and page level layout config, refer to html-class.service.ts
      document.body.className = '';
      this.htmlClassService.setConfig(layoutConfig);
    });

    this.unsubscribe.push(
      this.router.events.pipe(map((event: NavigationEnd) => event.url)).subscribe(
        url => this.url = url
      )
    );

    this.unsubscribe.push(subscription);
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  enable = true;
  clickEventSubscription: Subscription;
  isShadow = true;
  ngOnInit(): void {

    this.clickEventSubscription = this.dataService.getAsideLeftAndHeader().subscribe((data) => {
      this.enable = data;
      this.isShadow = data;

      if(!this.isShadow){
        // const =
      }

    })

    console.log('aaaaaaaaaaaaaaaaaaaaa', this.authService)
    console.log('aaaaaaaaaaaaaaaaaaaaa', this.authService.currentUserValue)

    let perm = [];
    if(!this.authService.currentUserValue
      || !this.authService.currentUserValue?.authorities
      ||  this.authService.currentUserValue?.authorities.length === 0){

      this.router.navigate(['/auth/login']);

    }else {
      perm = this.authService.currentUserValue.authorities;
    }
    // const perm = this.authService.currentUserValue.authorities;

    this.permissionsService.loadPermissions(perm);

    this.http.get('url').subscribe((permissions: any) => {
      this.permissionsService.loadPermissions(permissions);
    })

    const config = this.layoutConfigService.getConfig();
    // Load UI from Layout settings
    this.selfLayout = objectPath.get(config, 'self.layout');
    this.asideSelfDisplay = objectPath.get(config, 'aside.self.display');
    // this.subheaderDisplay = objectPath.get(config, 'subheader.display');
    this.contentClasses = this.htmlClassService.getClasses('content', true).toString();
    this.contentContainerClasses = this.htmlClassService.getClasses('content_container', true).toString();
    this.contentExtended = objectPath.get(config, 'content.extended');

    // let the layout type change
    const subscription = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
      setTimeout(() => {
        this.selfLayout = objectPath.get(cfg, 'self.layout');
      });
    });
    this.unsubscribe.push(subscription);
  }

  checkSocketConnect() {
    const user = this.localStorageService.get(this.localStorageService.CURRENT_USER) as UserModel;
    if (!user) return;
    const role = user.authorities as string[];

    if (!role) {
      return;
    }

    connectSocket(role, user.login, this.stompService, this.destroy$);
  }

  closedNotice(event: Notify) {

    const payload = {
      data: {
        id: event.data.id,
        type: event.type,
        currentUser: this.currentUser.login
      },
      objectId: ObjectIDManager.TEACHER_CLOSE_NOTIFY
    } as unknown as Payload<Notification>;

    this.stompService.redirectMessage<Notification>(payload);
  }

  closedNoticeStudent(event: Notify) {
  console.log("event:",event.data)
    const payload = {
      data: {
        id: event.data.id ,
        type: event.type,
        currentUser: this.currentUser.login,
        courseLessonStudentId: event.data.courseLessonStudentId
      },
      objectId: ObjectIDManager.STUDENT_CLOSE_NOTIFY
    } as unknown as Payload<Notification>;
    this.stompService.redirectMessage<Notification>(payload);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
    // https://www.npmjs.com/package/ngx-permissions
    this.permissionsService.flushPermissions();
  }

  /**
   * NGX Permissions, init roles
   */
  loadRolesWithPermissions() {
    // this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
    // const subscription = this.currentUserPermissions$.subscribe(res => {
    //   if (!res || res.length === 0) {
    //     return;
    //   }
    //
    //   this.permissionsService.flushPermissions();
    //   res.forEach((pm: Permission) => this.permissionsService.addPermission(pm.name));
    // });
    // this.unsubscribe.push(subscription);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    // if(this.screenWidth > 576){
    if (this.screenWidth > 991) {
      this.desktop = true;
      this.mobile = false;
    } else {
      this.desktop = false;
      this.mobile = true;
    }

    // cho man Lam bai thi
    // const ktWapper = document.querySelector('.kt_wrapper') as HTMLElement;
    // if(!this.isShadow && this.screenWidth > 1200){
    //   ktWapper.style.paddingTop = `99px`;
    // }else {
    //   // ktWapper.
    //   ktWapper.style.paddingTop = '0';
    // }

  }

  get padding(): boolean {
    return this.desktop && this.isShadow
  }
}

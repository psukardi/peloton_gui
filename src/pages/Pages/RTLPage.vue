<template>
  <div>
    <div class="row">
      <div class="col-lg-6 col-sm-6 text-center">
        <card
          type="tasks"
          class="text-left"
          :header-classes="{ 'text-right': $rtl.isRTL }"
        >
          <template slot="header">
            <h6 class="title d-inline">Tasks (5)</h6>
            <p class="card-category d-inline">Today</p>

            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              :class="{ 'float-left': $rtl.isRTL }"
            >
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">Action</a>
              <a class="dropdown-item" href="#pablo">Another action</a>
              <a class="dropdown-item" href="#pablo">Something else</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>

        <card type="contributions">
          <h1 class="card-title">6,332</h1>
          <h3 class="card-category">مجموع المساهمات العامة</h3>
          <p class="card-description">
            بعد نجاح ناجح لمدة عامين ، سنقوم بتغيير طريقة عمل المساهمات.
          </p>
          <hr />

          <template slot="footer">
            <div class="row">
              <div class="col-lg-6 col-md-8 ml-auto mr-auto">
                <div class="card-stats justify-content-center">
                  <base-switch
                    v-model="allContributions"
                    on-text="ON"
                    off-text="ON"
                  ></base-switch>
                  <span>جميع المساهمات العامة </span>
                </div>
              </div>
              <div class="col-lg-6 col-md-8 ml-auto mr-auto">
                <div class="card-stats justify-content-center">
                  <base-switch
                    v-model="pastWeekContributions"
                    on-text="ON"
                    off-text="ON"
                  ></base-switch>
                  <span>مساهمات الأسبوع الماضي </span>
                </div>
              </div>
            </div>
          </template>
        </card>
      </div>

      <div class="col-lg-6 col-sm-6">
        <card type="timeline" class="card-plain">
          <time-line type="simple">
            <time-line-item
              inverted
              badge-type="danger"
              badge-icon="tim-icons icon-bag-16"
            >
              <span slot="header" class="badge badge-danger">بعض العنوان </span>
              <p slot="content">
                ل Wifey قدم أفضل وجبة يوم الأب على الإطلاق. ممتن جدا سعيد جدا
                حتى المباركة. شكراً لك على صنع عائلتي لقد استمتعنا بالموضوع
                "المستقبلي" !!! كانت ليلة ممتعة معًا ...
              </p>

              <h6 slot="footer">
                <i class="ti-time"></i> قبل ساعتين عبر تويتر
              </h6>
            </time-line-item>

            <time-line-item
              inverted
              badge-type="success"
              badge-icon="tim-icons icon-gift-2"
            >
              <span slot="header" class="badge badge-success">واحدة أخرى </span>
              <p slot="content">
                أشكر الله على دعم زوجتي وأصدقائي الحقيقيين. أود أيضًا الإشارة
                إلى أنه أول ألبوم ينتقل إلى رقم 1 من البث المباشر !!! أنا أحبك
                إلين وأيضا قاعدة بلدي رقم واحد تصميم أي شيء أفعله من الأحذية إلى
                الموسيقى إلى المنازل.
              </p>
            </time-line-item>

            <time-line-item
              inverted
              badge-type="info"
              badge-icon="tim-icons icon-planet"
            >
              <span slot="header" class="badges badge-info">عنوان آخر</span>

              <template slot="content">
                <p>
                  يطلق عليه أنا أفتقد كاني القديم هذا كل ما كان كاني وأنا أحبك
                  مثل كانيي يحب كاني الشهير مشاهدة فيجويروا والثاني عشر في وسط
                  المدينة LA 11:10 PM
                </p>
                <p>
                  ماذا لو قدمت كاني أغنية عن كاني رويير لا تصنع سرير الدب القطبي
                  ولكن الأريكة الدببة القطبية هي قطعة الأثاث المفضلة لدينا التي
                  نملكها. لم يكن أي مجموعة من على أهدافه كاني
                </p>
                <hr />
              </template>

              <base-dropdown
                slot="footer"
                title-classes="btn btn-round btn-info"
              >
                <i slot="title" class="tim-icons icon-bullet-list-67"></i>

                <a class="dropdown-item" href="#">عمل</a>
                <a class="dropdown-item" href="#">عمل آخر</a>
                <a class="dropdown-item" href="#">شيء آخر هنا</a>
              </base-dropdown>
            </time-line-item>
          </time-line>
        </card>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-6">
        <card
          type="pricing"
          class="card-primary card-white"
          footer-classes="text-center mb-3 mt-3"
        >
          <h1 class="card-title">pro</h1>
          <img class="card-img" src="img/card-primary.png" alt="Image" />
          <ul class="list-group">
            <li class="list-group-item">300 رسائل</li>
            <li class="list-group-item">150 رسائل البريد الإلكتروني</li>
            <li class="list-group-item">24/7 الدعم</li>
          </ul>
          <div class="card-prices">
            <h3 class="text-on-front"><span>$</span>95</h3>
            <h5 class="text-on-back">95</h5>
            <p class="plan">خطة مهنية</p>
          </div>
          <base-button slot="footer" round type="primary" class="btn-just-icon">
            البدء
          </base-button>
        </card>
      </div>

      <div class="col-lg-3 col-md-6">
        <card
          type="pricing"
          class="card-primary"
          footer-classes="text-center mb-3 mt-3"
        >
          <h1 class="card-title">pro</h1>
          <img class="card-img" src="img/card-primary.png" alt="Image" />
          <ul class="list-group">
            <li class="list-group-item">300 رسائل</li>
            <li class="list-group-item">150 رسائل البريد الإلكتروني</li>
            <li class="list-group-item">24/7 الدعم</li>
          </ul>
          <div class="card-prices">
            <h3 class="text-on-front"><span>$</span>95</h3>
            <h5 class="text-on-back">95</h5>
            <p class="plan">خطة مهنية</p>
          </div>
          <base-button slot="footer" round type="primary" class="btn-just-icon">
            البدء
          </base-button>
        </card>
      </div>

      <div class="col-md-6">
        <card type="testimonial" header-classes="card-header-avatar">
          <a slot="header" href="#pablo">
            <img class="img img-raised" src="img/james.jpg" alt="Card image" />
          </a>

          <p class="card-description">
            إن التشبيك في قمة الويب لا يشبه أي مؤتمر تقني أوروبي آخر.
          </p>
          <div class="icon icon-primary">
            <i class="fas fa-quote-right"></i>
          </div>

          <template slot="footer">
            <h4 class="card-title">روبرت بريسن</h4>
            <p class="category">@خطةطليعة</p>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import TaskList from 'src/pages/Dashboard/TaskList';
import {
  BaseSwitch,
  TimeLine,
  TimeLineItem,
  BaseCheckbox
} from 'src/components';

export default {
  components: {
    BaseSwitch,
    TimeLine,
    TimeLineItem,
    TaskList,
    BaseCheckbox
  },
  data() {
    return {
      allContributions: true,
      pastWeekContributions: false
    };
  },
  mounted() {
    this.i18n = this.$i18n;
    this.i18n.locale = 'ar';
    this.$rtl.enableRTL();
  },
  beforeDestroy() {
    this.i18n.locale = 'en';
    this.$rtl.disableRTL();
  }
};
</script>
<style></style>

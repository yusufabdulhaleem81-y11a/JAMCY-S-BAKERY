const { useState, useEffect, useMemo, useRef, useContext, createContext } = React;

/* ============================================================
   BUSINESS CONFIG
   ============================================================ */
const BUSINESS = {
  name: "Jamcy’s Bakery",
  tagline: "Elegant in Every Mouthful",
  phone: "08142444406",
  whatsapp: "08142444406",
  whatsappIntl: "2348142444406",
  address: "60 Housing Estate",
  accountName: "Opay-JAMEELAH TUKUR MUHAMMAD",
  accountNumber: "8142444406",
  deliveryFee: null,
  payOnFulfillment: true,
};

const fmt = (n) => n == null ? '' : '₦' + Number(n).toLocaleString('en-NG');
const waLink = (msg) => `https://wa.me/${BUSINESS.whatsappIntl}?text=${encodeURIComponent(msg)}`;

/* ============================================================
   IMAGE SYSTEM — swap any URL in place, nothing else changes
   ============================================================ */
const U = (id, w = 800) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const IMGS = {
  chocChip:'photo-1499636136210-6f4ee915583e', chocStack:'photo-1558961363-fa8fdf82db35',
  cupcakes:'photo-1486427944299-d1955d23e34d', chocCake:'photo-1578985545062-69928b1d9587',
  bdayCandles:'photo-1464349095431-e9a21285b5f3', bdayCake:'photo-1542826438-bd32f43d626f',
  bdayKid:'photo-1464349153735-7db50ed83c84', sparkler:'photo-1535141192574-5d4897c12636',
  cakeElegant:'photo-1606890737304-57a1ca8a5b62', redVelvet:'photo-1586985289906-406988974504',
  redCookie:'photo-1621939514649-280e2ee25f60', cakeBerries:'photo-1481391319762-47dff72954d9',
  cakeSlice:'photo-1541783245831-57d6fb0926d3', pinkCake:'photo-1621303837174-89787a7d4729',
  strawberry:'photo-1565958011703-44f9829ba187', anniversary:'photo-1524351199678-941a58a3df50',
  macaronStack:'photo-1602351447937-745cb720612f',
  weddingTable:'photo-1522673607200-164d1b6ce486', weddingBouquet:'photo-1520854221256-17451cc331bf',
  weddingArch:'photo-1465495976277-4387d4b0b4c6', weddingCouple:'photo-1519741497674-611481863552',
  weddingWalk:'photo-1519225421980-715cb0215aed', intimate:'photo-1522098543979-ffc7f79a56c4',
  gradBuilding:'photo-1541339907198-e08756dedf3f', gradCaps:'photo-1523050854058-8df90110c9f1',
  gradThrow:'photo-1523240795612-9a054b0db644', gradThrow2:'photo-1523580846011-d3a5bc25702b',
  school:'photo-1427504494785-3a9ca7044f45', classroom:'photo-1509062522246-3755977927d7',
  students:'photo-1517486808906-6ca8b3f04846', balloons:'photo-1530103862676-de8c9debad1d',
  baby:'photo-1488477181946-6428a0291777', bridal:'photo-1519657337289-077653f724ed',
  croissant:'photo-1555507036-ab1f4038808a', cinnamon:'photo-1509365465985-25d11c17e812',
  dessertCups:'photo-1551024506-0bccd828d307', brownies:'photo-1607920591413-4ec007e70023',
  macarons:'photo-1569864358642-9d1684040f43',
  donut:'photo-1551024601-bec78aea704b',
  samosa:'photo-1601050690597-df0568f70950', friedSnack:'photo-1601050690117-94f5f6fa8bd7',
  meatpie:'photo-1626074353765-517a681e40be', hotdog:'photo-1568209865332-a15790aed756',
  foodTable:'photo-1504674900247-0877df9cc836', foodSpread:'photo-1555396273-367ea4eb4db5',
  eventTable:'photo-1511795409834-ef04bbd61622', fineDining:'photo-1414235077428-338989a2e8c0',
  bbq:'photo-1555939594-58d7cb561ad1', picnic:'photo-1533777857889-4be7c70b33f7',
  restaurant:'photo-1517248135467-4c7edcad34c4', foodBowl:'photo-1490645935967-10de6ba17061',
  giftBox:'photo-1549465220-1a8b9238cd48', giftRed:'photo-1607083206869-4c7672e72a8a',
  miniBox:'photo-1513885535751-8b9238bd345a',
  oatCookies:'photo-1568827999250-3f6afff96e66', cookies2:'photo-1557925923-cd4648e211a0',
  butterCookies:'photo-1583744946564-b52ac1c389c8', shortbread:'photo-1606313564200-e75d5e30476c',
  caramel:'photo-1606315290298-4b7bc3d1904f', whiteChoc:'photo-1603532648955-039310d9ed75',
  milky:'photo-1587241321921-91a834d6d191', coconut:'photo-1548365328-8c6db3220e4c',
  assorted:'photo-1574856344991-aaa31b6f4ce3', pancakeBerry:'photo-1495147466023-ac5c588e2e94',
};
const GLOBAL_FB = [U(IMGS.chocChip,800), U(IMGS.chocStack,800), U(IMGS.cupcakes,800)];
const CAT_FB = {
  cookie:[U(IMGS.chocStack,800),U(IMGS.chocChip,800)],
  cake:[U(IMGS.chocCake,800),U(IMGS.bdayCandles,800)],
  'event-cake':[U(IMGS.bdayCandles,800),U(IMGS.sparkler,800)],
  'wedding-cake':[U(IMGS.weddingTable,800),U(IMGS.weddingArch,800)],
  'signout-cake':[U(IMGS.gradThrow,800),U(IMGS.gradCaps,800)],
  snack:[U(IMGS.foodSpread,800),U(IMGS.foodTable,800)],
  pastry:[U(IMGS.croissant,800),U(IMGS.cinnamon,800)],
  package:[U(IMGS.eventTable,800),U(IMGS.foodSpread,800)],
};
const FB = (cat) => CAT_FB[cat] || [];

/* ============================================================
   PRODUCT DATA — prices & images easy to edit
   ============================================================ */
/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} sub
 * @property {number|null} price
 * @property {string} description
 * @property {string} image
 * @property {string[]} [gallery]
 * @property {boolean} [featured]
 * @property {number} [pop]
 * @property {Object} [options]
 * @property {string[]} [includedItems]
 * @property {string} [servings]
 * @property {string} [tag]
 */
const CAKE_SIZES = ['6" Small (serves 6–8)','8" Round (serves 10–15)','10" Round (serves 20–25)','12" Round (serves 30–40)','Sheet Cake (serves 40+)'];
const CAKE_FLAVORS = ['Vanilla','Chocolate','Red Velvet','Coconut','Banana','Marble'];
const cakeOpts = { custom: true, sizes: CAKE_SIZES, flavors: CAKE_FLAVORS };

const P = (id,name,category,sub,price,description,imageId,extra={}) =>
  ({ id, name, category, sub, price, description, image:U(imageId,800), gallery:[U(imageId,900)], featured:false, pop:5, ...extra });

const PRODUCTS = [
  /* COOKIES */
  P('cookie-chocchip','Chocolate Chip Cookies','cookie','classic',3500,'Golden edges, soft centres and generous pools of chocolate in every bite.',IMGS.chocChip,{featured:true,pop:10,tag:'Chocolate'}),
  P('cookie-butter','Classic Butter Cookies','cookie','classic',3500,'Melt-in-the-mouth butter cookies, baked golden and perfect with tea.',IMGS.butterCookies,{pop:9,tag:'Buttery'}),
  P('cookie-doublechoc','Double Chocolate Cookies','cookie','classic',4000,'Rich cocoa dough loaded with chocolate chunks — for serious chocolate lovers.',IMGS.chocStack,{pop:9,tag:'Chocolate'}),
  P('cookie-redvelvet','Red Velvet Cookies','cookie','classic',4500,'Velvety red cookies with a hint of cocoa and a soft, tender bite.',IMGS.redCookie,{pop:7,tag:'Classic'}),
  P('cookie-vanilla','Vanilla Cookies','cookie','classic',3000,'Simple, fragrant vanilla cookies — delicate and universally loved.',IMGS.cakeSlice,{pop:6,tag:'Classic'}),
  P('cookie-coconut','Coconut Cookies','cookie','classic',3500,'Toasty coconut folded through a crisp, buttery dough.',IMGS.coconut,{pop:6,tag:'Sweet'}),
  P('cookie-oatmeal','Oatmeal Cookies','cookie','classic',3500,'Wholesome oats with a chewy centre and warmly spiced flavour.',IMGS.oatCookies,{pop:6,tag:'Classic'}),
  P('cookie-shortbread','Shortbread Cookies','cookie','classic',4000,'Buttery, crumbly Scottish-style shortbread that dissolves on the tongue.',IMGS.shortbread,{pop:7,tag:'Buttery'}),
  P('cookie-peanut','Peanut Cookies','cookie','classic',3500,'Roasted peanut richness with a satisfyingly crumbly texture.',IMGS.brownies,{pop:6,tag:'Nutty'}),
  P('cookie-caramel','Caramel Cookies','cookie','classic',4500,'Soft cookies swirled with sweet, golden caramel.',IMGS.caramel,{pop:7,tag:'Sweet'}),
  P('cookie-whitechoc','White Chocolate Cookies','cookie','classic',4500,'Creamy white chocolate chunks in a vanilla-kissed dough.',IMGS.whiteChoc,{pop:6,tag:'Chocolate'}),
  P('cookie-milky','Milky Cookies','cookie','classic',3500,'Mild, milky sweetness — a gentle favourite for all ages.',IMGS.milky,{pop:5,tag:'Classic'}),
  P('cookie-birthday','Birthday Cookies','cookie','classic',5000,'Festive sprinkle-studded cookies made for celebrating.',IMGS.donut,{pop:8,tag:'Festive'}),
  P('cookie-assorted','Assorted Cookies','cookie','classic',6000,'A mixed box of our best-loved flavours — something for everyone.',IMGS.assorted,{pop:8,tag:'Party'}),
  P('box-premium','Premium Cookie Box','cookie','box',15000,'Our finest selection, beautifully packed — an unforgettable gift.',IMGS.giftRed,{featured:true,pop:9,tag:'Premium'}),
  P('box-mini','Mini Cookie Box','cookie','box',6000,'A little box of joy — perfect for tasting or small gifts.',IMGS.miniBox,{pop:6,tag:'Gift'}),
  P('box-party','Party Cookie Box','cookie','box',12000,'Generous party packs to keep every guest smiling.',IMGS.balloons,{pop:7,tag:'Party'}),
  P('box-corporate','Corporate Cookie Box','cookie','box',18000,'Branded-friendly cookie boxes for clients, staff and events.',IMGS.foodTable,{pop:7,tag:'Premium'}),
  P('box-gift','Gift Cookie Box','cookie','box',12000,'Wrapped and ribboned — our cookies make the sweetest gift.',IMGS.giftBox,{pop:8,tag:'Gift'}),

  /* CAKES */
  P('cake-simple-birthday','Simple Birthday Cake','cake','birthday',15000,'A beautifully finished classic birthday cake, personalised just for you.',IMGS.bdayCake,{featured:true,pop:10,options:cakeOpts}),
  P('cake-premium-birthday','Premium Birthday Cake','cake','birthday',25000,'Tiered elegance with premium finishing, florals and detailing.',IMGS.cakeElegant,{pop:9,options:cakeOpts}),
  P('cake-kids','Kids Birthday Cake','cake','birthday',18000,'Playful themes and colours that make little ones light up.',IMGS.bdayKid,{pop:8,options:cakeOpts}),
  P('cake-photo','Photo Cake','cake','birthday',22000,'Your photo, printed on a smooth icing surface — a cake they will remember.',IMGS.pinkCake,{pop:8,options:cakeOpts}),
  P('cake-choc-birthday','Chocolate Birthday Cake','cake','birthday',20000,'Deep, moist chocolate layered with rich ganache.',IMGS.chocCake,{featured:true,pop:10,options:cakeOpts}),
  P('cake-vanilla','Vanilla Birthday Cake','cake','birthday',18000,'Light vanilla sponge with silky buttercream — timeless.',IMGS.cakeSlice,{pop:7,options:cakeOpts}),
  P('cake-redvelvet','Red Velvet Cake','cake','birthday',25000,'Signature red velvet with smooth cream cheese frosting.',IMGS.redVelvet,{pop:9,options:cakeOpts}),
  P('cake-buttercream','Buttercream Dream Cake','cake','birthday',20000,'Piped swirls of silky buttercream in your chosen palette.',IMGS.cakeBerries,{pop:7,options:cakeOpts}),
  P('cake-luxury','Luxury Birthday Cake','cake','birthday',45000,'Show-stopping design, premium finishes and flawless detail.',IMGS.strawberry,{pop:8,options:cakeOpts}),
  P('cake-celebration','Celebration Cake','cake','celebration',20000,'For every milestone worth marking — elegant and delicious.',IMGS.sparkler,{pop:7,options:cakeOpts}),
  P('cake-anniversary','Anniversary Cake','cake','anniversary',28000,'Romantic florals and refined finishes for your celebration.',IMGS.anniversary,{pop:7,options:cakeOpts}),
  P('cake-custom','Custom Creation Cake','cake','custom',null,'Share your idea — we will design a one-of-a-kind cake around it.',IMGS.macaronStack,{pop:6,options:cakeOpts}),

  /* EVENT CAKES */
  P('cake-graduation','Graduation Cake','event-cake','graduation',25000,'Celebrate hard-earned success with a cake worth the moment.',IMGS.gradCaps,{featured:true,pop:9,options:cakeOpts}),
  P('cake-babyshower','Baby Shower Cake','event-cake','baby-shower',22000,'Soft pastels and sweet details to welcome the little one.',IMGS.baby,{pop:8,options:cakeOpts}),
  P('cake-corporate','Corporate Event Cake','event-cake','corporate',30000,'Polished, branded and boardroom-ready centrepieces.',IMGS.fineDining,{pop:6,options:cakeOpts}),

  /* WEDDING CAKES */
  P('wedding-classic','Classic Tiered Wedding Cake','wedding-cake','wedding',null,'Timeless tiered elegance, finished to match your wedding palette.',IMGS.weddingTable,{pop:10,options:cakeOpts,gallery:[U(IMGS.weddingTable,900),U(IMGS.weddingArch,900),U(IMGS.weddingCouple,900)]}),
  P('wedding-luxury','Luxury Floral Wedding Cake','wedding-cake','wedding',null,'Hand-finished florals and premium detailing for a grand celebration.',IMGS.weddingBouquet,{pop:9,options:cakeOpts}),
  P('wedding-modern','Modern Minimal Wedding Cake','wedding-cake','wedding',null,'Clean lines, refined textures — understated luxury.',IMGS.weddingWalk,{pop:8,options:cakeOpts}),
  P('wedding-floral','Floral Cascade Wedding Cake','wedding-cake','wedding',null,'Fresh florals cascading across soft tiers — pure romance.',IMGS.weddingArch,{pop:8,options:cakeOpts}),
  P('wedding-intimate','Intimate Wedding Cake','wedding-cake','wedding',null,'Charming single or double tiers for smaller weddings.',IMGS.intimate,{pop:7,options:cakeOpts}),

  /* SIGN-OUT CAKES */
  P('signout-grad','Graduation Sign-Out Cake','signout-cake','signout',20000,'Send-off sweetness for the graduate of the moment.',IMGS.gradThrow,{featured:true,pop:9,options:cakeOpts}),
  P('signout-school','School Sign-Out Cake','signout-cake','signout',15000,'A fun farewell cake in your school colours.',IMGS.school,{pop:7,options:cakeOpts}),
  P('signout-uni','University Sign-Out Cake','signout-cake','signout',25000,'Faculty flair, inside jokes and memories in cake form.',IMGS.gradBuilding,{pop:8,options:cakeOpts}),
  P('signout-class','Class Sign-Out Cake','signout-cake','signout',18000,'Celebrate the whole class with names, faces and colours.',IMGS.classroom,{pop:7,options:cakeOpts}),
  P('signout-custom','Custom Sign-Out Cake','signout-cake','signout',null,'Tell us your story — we will bake it into the design.',IMGS.balloons,{pop:6,options:cakeOpts}),

  /* SNACKS */
  P('snack-fishroll','Fish Roll (Pack of 5)','snack','snack',2500,'Golden, flaky rolls with a savoury fish filling.',IMGS.friedSnack,{featured:true,pop:9}),
  P('snack-meatpie','Meat Pie (Pack of 4)','snack','snack',3000,'Classic Nigerian meat pies with rich, hearty filling.',IMGS.meatpie,{featured:true,pop:10}),
  P('snack-samosa','Samosa (Pack of 6)','snack','snack',2500,'Crisp parcels with spiced filling — impossible to eat just one.',IMGS.samosa,{featured:true,pop:9}),
  P('snack-sausage','Sausage Roll (Pack of 4)','snack','snack',2800,'Flaky pastry wrapped around juicy sausage.',IMGS.hotdog,{pop:7}),
  P('snack-puffpuff','Puff Puff (Pack of 10)','snack','snack',2000,'Soft, golden, cloud-like puff puff — a Nigerian classic.',IMGS.donut,{pop:8}),
  P('snack-smallchops','Small Chops Party Tray','snack','snack',15000,'A generous tray of small chops favourites for any gathering.',IMGS.foodSpread,{featured:true,pop:9}),
  P('snack-combo','Snack Combo Box','snack','snack',8500,'A curated mix of our snacks — perfect for sharing.',IMGS.foodTable,{pop:7}),

  /* PASTRIES */
  P('pastry-croissant','Butter Croissants (4)','pastry','pastry',4500,'Flaky, layered and gloriously buttery.',IMGS.croissant,{pop:7}),
  P('pastry-cinnamon','Cinnamon Rolls (4)','pastry','pastry',5000,'Soft swirled rolls with warm cinnamon and glaze.',IMGS.cinnamon,{pop:8}),
  P('pastry-macarons','French Macarons (6)','pastry','pastry',6500,'Delicate shells with luscious fillings in pretty pastels.',IMGS.macarons,{pop:7}),
  P('pastry-brownies','Fudge Brownies (Box of 6)','pastry','pastry',4000,'Dense, fudgy squares with a crackly top.',IMGS.brownies,{pop:8}),
  P('pastry-mousse','Chocolate Mousse Cups (4)','pastry','pastry',5500,'Silky chocolate mousse in elegant cups.',IMGS.dessertCups,{pop:7}),

  /* EVENT PACKAGES (quote-based) */
  P('pkg-birthday','Birthday Party Package','package','package',null,'A complete birthday spread, styled around your theme.',IMGS.bdayCandles,{pop:10,includedItems:['Themed celebration cake','24 cupcakes','50 assorted cookies','Small chops tray','Personalised toppers & styling guide'],servings:'Up to 30 guests'}),
  P('pkg-wedding','Wedding Package','package','package',null,'Everything sweet for your big day, handled beautifully.',IMGS.weddingTable,{pop:10,includedItems:['Tiered wedding cake','Dessert table (100+ treats)','Groom’s cake','Small chops & pastry station','Tasting session included'],servings:'Up to 150 guests'}),
  P('pkg-graduation','Graduation Package','package','package',null,'Sign-out celebrations made delicious and stress-free.',IMGS.gradThrow2,{pop:9,includedItems:['Sign-out cake','50 cupcakes','100 cookies','Snack trays','Custom school colours'],servings:'Up to 60 guests'}),
  P('pkg-babyshower','Baby Shower Package','package','package',null,'Soft, sweet styling to welcome the newest guest of honour.',IMGS.baby,{pop:8,includedItems:['Pastel themed cake','18 cupcakes','40 cookies','Dessert cups table','Custom colour palette'],servings:'Up to 30 guests'}),
  P('pkg-bridal','Bridal Shower Package','package','package',null,'Elegant treats for a beautiful pre-wedding celebration.',IMGS.bridal,{pop:8,includedItems:['Elegant shower cake','24 mini desserts','50 cookies','Floral dessert styling'],servings:'Up to 25 guests'}),
  P('pkg-corporate','Corporate Package','package','package',null,'Polished catering and branded treats for your organisation.',IMGS.foodTable,{pop:7,includedItems:['Branded cakes or cupcakes','100 branded cookie boxes','Pastry platters','Bulk delivery'],servings:'Customisable'}),
  P('pkg-kids','Children’s Party Package','package','package',null,'Fun, colourful and kid-approved — parents love it too.',IMGS.balloons,{pop:9,includedItems:['Kids themed cake','30 cupcakes','60 cookies','Party snack boxes','Fun toppers'],servings:'Up to 25 kids'}),
  P('pkg-small','Small Event Package','package','package',null,'Just the right spread for intimate gatherings.',IMGS.foodSpread,{pop:7,includedItems:['One celebration cake','2 snack trays','50 cookies'],servings:'Up to 20 guests'}),
  P('pkg-large','Large Event Package','package','package',null,'A grand dessert experience for big celebrations.',IMGS.eventTable,{pop:9,includedItems:['Multiple celebration cakes','Full dessert table','Pastry & small chops stations','Dedicated coordination'],servings:'100+ guests'}),
];
const byId = (id) => PRODUCTS.find(p => p.id === id);

/* ============================================================
   CATEGORY & NAV DATA (all real photography)
   ============================================================ */
const CATEGORIES = [
  { title:'Cakes', desc:'Soft, sweet & made to delight!', img:IMGS.chocCake, href:'#/cakes', big:true },
  { title:'Cookies', desc:'Buttery, crunchy & absolutely yummy!', img:IMGS.chocStack, href:'#/cookies', big:true },
  { title:'Fish Roll', desc:'Golden, flaky & savoury.', img:IMGS.friedSnack, href:'#/snacks' },
  { title:'Meat Pie', desc:'A hearty Nigerian classic.', img:IMGS.meatpie, href:'#/snacks' },
  { title:'Samosa', desc:'Crisp parcels of joy.', img:IMGS.samosa, href:'#/snacks' },
  { title:'Snacks', desc:'Perfect bites for every occasion!', img:IMGS.foodSpread, href:'#/snacks' },
  { title:'Event Cakes', desc:'Graduations, showers & more.', img:IMGS.gradCaps, href:'#/events', big:true },
  { title:'Wedding Cakes', desc:'Tiered elegance for your big day.', img:IMGS.weddingTable, href:'#/wedding-cakes', big:true },
  { title:'Sign-Out Cakes', desc:'A sweet send-off to remember.', img:IMGS.gradBuilding, href:'#/signout-cakes' },
  { title:'Event Packages', desc:'Complete celebration spreads.', img:IMGS.eventTable, href:'#/packages' },
  { title:'Pastries', desc:'Croissants, rolls & desserts.', img:IMGS.croissant, href:'#/shop' },
  { title:'Custom Cakes', desc:'Your idea, beautifully baked.', img:IMGS.pinkCake, href:'#/custom-cake', big:true },
  { title:'Catering', desc:'Catering made beautiful.', img:IMGS.fineDining, href:'#/catering', big:true },
];

const SHOP_FILTERS = [
  {key:'all',label:'All'},{key:'cake',label:'Cakes'},{key:'cookie',label:'Cookies'},{key:'snack',label:'Snacks'},
  {key:'pastry',label:'Pastries'},{key:'event-cake',label:'Event Cakes'},{key:'wedding-cake',label:'Wedding Cakes'},
  {key:'signout-cake',label:'Sign-Out Cakes'},{key:'package',label:'Event Packages'}
];

const TAG_STYLES = {
  'Buttery':'bg-gold-100 text-gold-700','Chocolate':'bg-cocoa-700 text-ivory','Classic':'bg-blush-100 text-wine-700',
  'Festive':'bg-wine-100 text-wine-700','Nutty':'bg-leaf-100 text-leaf-700','Sweet':'bg-blush-200 text-wine-800',
  'Gift':'bg-gold-200 text-gold-700','Party':'bg-leaf-200 text-leaf-700','Premium':'bg-wine-600 text-ivory'
};

/* ============================================================
   ICONS — SVG, UI only
   ============================================================ */
const ICONS = {
  bag:(<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></>),
  cart:(<><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></>),
  search:(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>),
  heart:(<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>),
  heartFill:(<path fill="currentColor" stroke="none" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>),
  user:(<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>),
  menu:(<><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>),
  close:(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>),
  phone:(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>),
  whatsapp:(<path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>),
  pin:(<><path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>),
  clock:(<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>),
  truck:(<><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></>),
  store:(<><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-4 0V7"/></>),
  cake:(<><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></>),
  cookie:(<><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></>),
  utensils:(<><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></>),
  calendar:(<><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></>),
  gift:(<><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></>),
  star:(<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>),
  arrowRight:(<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>),
  plus:(<><path d="M5 12h14"/><path d="M12 5v14"/></>),
  minus:(<path d="M5 12h14"/>),
  check:(<path d="M20 6 9 17l-5-5"/>),
  card:(<><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/></>),
  instagram:(<><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></>),
  facebook:(<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>),
  chevronDown:(<path d="m6 9 6 6 6-6"/>),
  copy:(<><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></>),
  mail:(<><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>),
  leaf:(<><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></>),
};
const Icon = ({name, size=20, className='', strokeWidth=1.8, style}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">{ICONS[name]||null}</svg>
);

/* ============================================================
   DECORATIVE BOTANICAL SVGs
   ============================================================ */
function Flower({cx=0, cy=0, r=10, petal='#FFCDD4', center='#F7BE3A'}){
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx="0" cy={-r*0.62} rx={r*0.42} ry={r*0.62} fill={petal} transform={`rotate(${a})`}/>
      ))}
      <circle r={r*0.28} fill={center}/>
    </g>
  );
}
function BotanicalSpray({className='', flip=false, opacity=1}){
  const leaf = 'M0 0 C 9 -13, 24 -16, 33 -7 C 24 3, 9 5, 0 0 Z';
  return (
    <svg viewBox="0 0 240 240" fill="none" className={className} style={{opacity}} aria-hidden="true">
      <g transform={flip ? 'translate(240 0) scale(-1 1)' : undefined}>
        <path d="M6 234 C 30 180, 60 130, 110 92 C 150 62, 190 42, 232 34" stroke="#6FB04A" strokeWidth="2.4" strokeLinecap="round"/>
        <path d="M78 148 C 100 136, 124 134, 144 144" stroke="#6FB04A" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M130 88 C 148 78, 168 78, 184 88" stroke="#6FB04A" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M44 192 C 62 182, 80 182, 96 190" stroke="#6FB04A" strokeWidth="1.8" strokeLinecap="round"/>
        <path d={leaf} fill="#8CC664" transform="translate(34 206) rotate(-28)"/>
        <path d={leaf} fill="#ACDA8A" transform="translate(64 172) rotate(-52)"/>
        <path d={leaf} fill="#6FB04A" transform="translate(96 142) rotate(-70) scale(.9)"/>
        <path d={leaf} fill="#8CC664" transform="translate(140 100) rotate(-24) scale(.85)"/>
        <path d={leaf} fill="#ACDA8A" transform="translate(172 76) rotate(-48) scale(.8)"/>
        <path d={leaf} fill="#6FB04A" transform="translate(200 52) rotate(-64) scale(.7)"/>
        <Flower cx={124} cy={140} r={16} petal="#FFCDD4" center="#F7BE3A"/>
        <Flower cx={182} cy={84} r={13} petal="#FFA8B4" center="#E05E84"/>
        <Flower cx={64} cy={196} r={10} petal="#EE93AC" center="#8E1B3F"/>
        <circle cx="206" cy="118" r="4" fill="#E05E84"/>
        <circle cx="216" cy="106" r="3" fill="#EE93AC"/>
        <circle cx="196" cy="130" r="3" fill="#F7BE3A"/>
      </g>
    </svg>
  );
}
function Sprinkles({className=''}){
  const cols = ['#F7BE3A','#FB7E90','#8CC664','#FFA8B4','#8E1B3F','#FFD25E'];
  const bits = [[8,20,-24],[22,64,18],[40,34,64],[58,80,-40],[76,18,30],[94,58,-70],[112,30,12],[130,74,48],[148,16,-18],[166,52,72],[184,26,-52],[202,70,22],[220,38,-30],[238,12,54],[30,92,40],[102,92,-36],[176,90,16]];
  return (
    <svg viewBox="0 0 250 110" className={className} aria-hidden="true">
      {bits.map(([x,y,r],i)=>(<rect key={i} x={x} y={y} width="12" height="4" rx="2" fill={cols[i%cols.length]} transform={`rotate(${r} ${x} ${y})`} opacity="0.9"/>))}
    </svg>
  );
}
const Divider = ({className=''}) => (
  <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
    <span className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-gold-400"/>
    <svg width="13" height="13" viewBox="0 0 24 24" className="text-wine-600 shrink-0"><path fill="currentColor" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    <span className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-gold-400"/>
  </div>
);

/* ============================================================
   SHARED UI
   ============================================================ */
function SafeImage({src, alt, className='', eager=false, fb=[], label}){
  const chain = useMemo(()=>{
    const c = [src, ...(fb||[]), ...GLOBAL_FB].filter(Boolean);
    return Array.from(new Set(c));
  }, [src, fb]);
  const [i, setI] = useState(0);
  useEffect(()=>setI(0), [src]);
  if (i >= chain.length) return (
    <div className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush-100 via-gold-50 to-leaf-50 ${className}`} role="img" aria-label={alt}>
      <svg viewBox="0 0 60 60" className="w-12 h-12 text-wine-500" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M48 44v-16a8 8 0 0 0-8-8H20a8 8 0 0 0-8 8v16"/><path d="M12 40s2-3 7-3 9 6 14 6 7-6 12-6 3 3 3 3"/><path d="M6 48h48"/><path d="M22 16v6M30 16v6M38 16v6"/>
      </svg>
      <span className="text-xs text-wine-700 font-semibold px-4 text-center">{label || alt}</span>
    </div>
  );
  return <img src={chain[i]} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={()=>setI(i+1)} className={className}/>;
}
const Qty = ({q, set}) => (
  <div className="inline-flex items-center rounded-full border border-cocoa-500/25 bg-white shadow-sm shrink-0">
    <button aria-label="Decrease quantity" onClick={()=>set(Math.max(1,q-1))} className="p-2.5 text-wine-700 hover:text-wine-500 transition"><Icon name="minus" size={15}/></button>
    <span className="w-7 text-center font-semibold text-cocoa-700 text-sm">{q}</span>
    <button aria-label="Increase quantity" onClick={()=>set(q+1)} className="p-2.5 text-wine-700 hover:text-wine-500 transition"><Icon name="plus" size={15}/></button>
  </div>
);
const SectionHeading = ({kicker, title, sub, light=false, center=true}) => (
  <div className={`${center?'text-center':''} reveal`}>
    {kicker && <p className={`font-script text-[clamp(1.6rem,6vw,2.5rem)] ${light?'text-gold-300':'text-gold-500'}`}>{kicker}</p>}
    <h2 className={`h2 font-display font-semibold mt-1 ${light?'text-ivory':'text-wine-700'}`}>{title}</h2>
    <Divider className="mt-4"/>
    {sub && <p className={`mt-4 max-w-2xl ${center?'mx-auto':''} ${light?'text-cream/90':'text-cocoa-500'}`}>{sub}</p>}
  </div>
);
const PageHero = ({kicker, title, sub, sprinkles=false}) => (
  <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-cream border-b border-gold-200/60">
    <BotanicalSpray className="absolute -left-10 -top-8 w-52 opacity-60 hidden md:block" flip/>
    <BotanicalSpray className="absolute -right-8 bottom-0 w-48 opacity-50 hidden md:block"/>
    {sprinkles && <Sprinkles className="absolute top-6 right-8 w-52 opacity-80 hidden md:block"/>}
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-11 md:pt-14 md:pb-14 text-center relative">
      <p className="font-script text-[clamp(1.6rem,6vw,2.5rem)] text-gold-500">{kicker}</p>
      <h1 className="h1 font-display font-semibold text-wine-700 mt-1">{title}</h1>
      <Divider className="mt-4"/>
      {sub && <p className="mt-4 max-w-2xl mx-auto text-cocoa-500">{sub}</p>}
    </div>
  </section>
);

/* ============================================================
   APP CONTEXT + CART
   ============================================================ */
const Ctx = createContext(null);
const useApp = () => useContext(Ctx);
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
function useHashRoute(){
  const [hash, setHash] = useState(location.hash || '#/');
  useEffect(() => {
    const on = () => setHash(location.hash || '#/');
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return hash.replace(/^#/, '') || '/';
}
function productWAMessage(p, qty, opts){
  let m = `Hello Jamcy’s Bakery, I would like to order:\n\nProduct: ${p.name}\nQuantity: ${qty}\nPrice: ${p.price ? fmt(p.price*qty) : 'Request a quote'}`;
  const ol = Object.entries(opts||{}).filter(([,v])=>v);
  if (ol.length) m += '\n\nOptions:\n' + ol.map(([k,v])=>`${String(k)[0].toUpperCase()+String(k).slice(1)}: ${v}`).join('\n');
  return m + '\n\nPlease let me know the next steps.';
}
function cartWAMessage(items, subtotal){
  const lines = items.map(l => {
    const o = Object.values(l.options||{}).filter(Boolean).join(', ');
    return `- ${l.product.name}${o?` (${o})`:''} x${l.qty} — ${l.product.price?fmt(l.product.price*l.qty):'quote'}`;
  }).join('\n');
  return `Hello Jamcy’s Bakery,\n\nI would like to place an order.\n\nORDER:\n${lines}\n\nSubtotal: ${fmt(subtotal)}\nDelivery/Pickup: (I will confirm — delivery or pickup)\n\nPlease confirm my order and delivery options.`;
}
function orderWAMessage(o){
  const lines = o.items.map((l)=>{
    const op = Object.values(l.options||{}).filter(Boolean).join(', ');
    return `- ${l.name}${op?` (${op})`:''} x${l.qty} — ${fmt(l.price*l.qty)}`;
  }).join('\n');
  const feeLine = o.fulfilment === 'Pickup' ? 'Delivery fee: — (pickup)'
    : (typeof o.fee === 'number' ? `Delivery fee: ${fmt(o.fee)}` : 'Delivery fee: To be confirmed');
  let m = `Hello Jamcy’s Bakery,\n\nI would like to place an order.\n\nORDER:\n${lines}\n\nSubtotal: ${fmt(o.subtotal)}\nDelivery/Pickup: ${o.fulfilment}\n${feeLine}\nTotal: ${fmt(o.total)}\n\nCUSTOMER:\nName: ${o.customer.name}\nPhone: ${o.customer.phone}`;
  if (o.customer.email) m += `\nEmail: ${o.customer.email}`;
  if (o.fulfillment === 'Delivery') m += `\nAddress: ${o.customer.address}` + (o.customer.landmark ? `\nLandmark: ${o.customer.landmark}` : '');
  m += `\n\nPayment: ${o.payment}`;
  if (o.payRef) m += `\nPayment Reference: ${o.payRef}`;
  m += `\nOrder Reference: ${o.ref}`;
  if (o.customer.notes) m += `\n\nNotes: ${o.customer.notes}`;
  return m + '\n\nPlease confirm my order.';
}

/* ============================================================
   NAVBAR + MENUS + SEARCH
   ============================================================ */
const Logo = ({light=false}) => (
  <a href="#/" className="leading-none whitespace-nowrap" aria-label="Jamcy’s Bakery — Home">
    <span className={`font-display font-bold text-[1.35rem] min-[360px]:text-2xl tracking-tight ${light?'text-ivory':'text-wine-700'}`}>Jamcy’s</span>
    <span className="font-script text-[1.5rem] min-[360px]:text-[1.65rem] text-gold-500 -ml-0.5">Bakery</span>
  </a>
);
const NAV = [
  {label:'Home', href:'#/'},{label:'Shop', href:'#/shop'},{label:'Cookies', href:'#/cookies'},{label:'Cakes', href:'#/cakes'},
  {label:'Events', href:'#/events', dropdown:[
    {label:'Event Cakes', href:'#/events'},{label:'Wedding Cakes', href:'#/wedding-cakes'},
    {label:'Sign-Out Cakes', href:'#/signout-cakes'},{label:'Event Packages', href:'#/packages'},{label:'Custom Cake', href:'#/custom-cake'}]},
  {label:'Catering', href:'#/catering'},{label:'About', href:'#/about'},{label:'Contact', href:'#/contact'},
];
const MOBILE_LINKS = [
  {label:'Home', href:'#/'},{label:'Shop', href:'#/shop'},{label:'Cookies', href:'#/cookies'},{label:'Cakes', href:'#/cakes'},
  {label:'Event Cakes', href:'#/events'},{label:'Wedding Cakes', href:'#/wedding-cakes'},{label:'Sign-Out Cakes', href:'#/signout-cakes'},
  {label:'Event Packages', href:'#/packages'},{label:'Catering', href:'#/catering'},{label:'Custom Cake', href:'#/custom-cake'},
  {label:'About', href:'#/about'},{label:'Contact', href:'#/contact'},
];
function Navbar({route, onSearch, onCart, onMenu}){
  const { cartCount } = useApp();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener('scroll', on, {passive:true});
    return () => window.removeEventListener('scroll', on);
  }, []);
  const active = (href) => href === '#/' ? route === '/' : route.startsWith(href.slice(1));
  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-soft border-b border-gold-200/70' : 'bg-ivory/80 backdrop-blur-sm border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-[66px] min-[400px]:h-[74px] gap-2">
          <Logo/>
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV.map(n => !n.dropdown ? (
              <a key={n.label} href={n.href} className={`px-3.5 py-2 rounded-full text-[15px] font-medium transition ${active(n.href)?'text-wine-700 bg-wine-50':'text-cocoa-600 hover:text-wine-700 hover:bg-wine-50'}`}>{n.label}</a>
            ) : (
              <div key={n.label} className="relative group">
                <a href={n.href} className={`px-3.5 py-2 rounded-full text-[15px] font-medium transition inline-flex items-center gap-1 ${active(n.href)?'text-wine-700 bg-wine-50':'text-cocoa-600 hover:text-wine-700 hover:bg-wine-50'}`}>
                  {n.label}<Icon name="chevronDown" size={14} className="transition-transform group-hover:rotate-180"/>
                </a>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                  <div className="bg-ivory rounded-2xl shadow-lift border border-gold-200/70 py-2 min-w-[210px]">
                    {n.dropdown.map(d => <a key={d.label} href={d.href} className="block px-5 py-2.5 text-[15px] text-cocoa-600 hover:bg-blush-50 hover:text-wine-700 transition">{d.label}</a>)}
                  </div>
                </div>
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-0.5 sm:gap-1.5">
            <button onClick={onSearch} aria-label="Search products" className="icon-btn p-2 min-[400px]:p-2.5 text-wine-700 hover:bg-wine-50"><Icon name="search" size={20}/></button>
            <button onClick={onCart} aria-label="Open cart" className="icon-btn p-2 min-[400px]:p-2.5 relative text-wine-700 hover:bg-wine-50">
              <Icon name="bag" size={20}/>
              {cartCount > 0 && <span key={cartCount} className="animate-pop absolute -top-0.5 -right-0.5 min-w-[19px] h-[19px] px-1 rounded-full bg-wine-600 text-ivory text-[11px] font-bold flex items-center justify-center border-2 border-ivory">{cartCount}</span>}
            </button>
            <a href="#/shop" className="btn btn-primary !py-2.5 !px-5 text-sm hidden md:inline-flex">Order Now</a>
            <button onClick={onMenu} aria-label="Open menu" className="icon-btn p-2 min-[400px]:p-2.5 text-wine-700 hover:bg-wine-50 lg:hidden"><Icon name="menu" size={20}/></button>
          </div>
        </div>
      </div>
    </header>
  );
}
function MobileMenu({open, close, route}){
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);
  useEffect(() => { const on = (e)=>{ if(e.key==='Escape') close(); }; window.addEventListener('keydown',on); return ()=>window.removeEventListener('keydown',on); }, [close]);
  if (!open) return null;
  const active = (href) => href === '#/' ? route === '/' : route.startsWith(href.slice(1));
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-wine-900/55 backdrop-blur-sm" onClick={close}/>
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-ivory shadow-lift flex flex-col" style={{animation:'fadeUp .3s ease'}}>
        <div className="flex items-center justify-between px-4 h-[66px] min-[400px]:h-[74px] border-b border-gold-200/70">
          <Logo/>
          <button onClick={close} aria-label="Close menu" className="icon-btn p-2.5 text-wine-700 hover:bg-wine-50"><Icon name="close"/></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Mobile navigation">
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-1">
            {MOBILE_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={close} className={`py-3 px-2.5 rounded-xl font-display text-[15px] min-[380px]:text-[17px] transition ${active(l.href)?'text-wine-700 bg-wine-50 font-semibold':'text-cocoa-600 hover:bg-blush-50 hover:text-wine-700'}`}>{l.label}</a>
            ))}
          </div>
          <Divider className="mt-6"/>
          <a href={waLink("Hello Jamcy’s Bakery, I would like to place an order.")} target="_blank" rel="noopener" className="btn btn-wa w-full mt-5"><Icon name="whatsapp" size={18}/> WhatsApp: {BUSINESS.whatsapp}</a>
          <a href={`tel:${BUSINESS.phone}`} className="btn btn-outline w-full mt-3"><Icon name="phone" size={18}/> Call the Bakery</a>
        </nav>
        <p className="text-center font-script text-2xl text-gold-500 pb-5">Elegant in Every Mouthful</p>
      </div>
    </div>
  );
}
function SearchOverlay({open, close}){
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const { setShopSearch, setQuickView } = useApp();
  useEffect(() => { if (open) setTimeout(()=>inputRef.current && inputRef.current.focus(), 60); else setQ(''); }, [open]);
  useEffect(() => {
    const on = (e)=>{ if(e.key==='Escape') close(); };
    window.addEventListener('keydown',on); return ()=>window.removeEventListener('keydown',on);
  }, [close]);
  if (!open) return null;
  const ql = q.trim().toLowerCase();
  const results = ql ? PRODUCTS.filter(p => (p.name+' '+p.description).toLowerCase().includes(ql)).slice(0,8) : [];
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-wine-900/55 backdrop-blur-sm" onClick={close}/>
      <div className="absolute left-4 right-4 top-16 sm:relative sm:left-auto sm:right-auto sm:top-24 sm:max-w-xl sm:mx-auto bg-ivory rounded-3xl shadow-lift border border-gold-200/70 overflow-hidden" style={{animation:'fadeUp .3s ease'}}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gold-200/60">
          <Icon name="search" className="text-gold-500"/>
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search cookies, cakes, snacks…" className="flex-1 min-w-0 bg-transparent outline-none text-cocoa-700 placeholder:text-cocoa-400" aria-label="Search products"/>
          <button onClick={close} aria-label="Close search" className="icon-btn p-1.5 text-cocoa-500 hover:text-wine-700"><Icon name="close" size={18}/></button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto">
          {q && results.length === 0 && <p className="px-5 py-8 text-center text-cocoa-500">No treats match “{q}”. Try “cookies”, “cake” or “pie”.</p>}
          {results.map(p => (
            <button key={p.id} onClick={()=>{ close(); setQuickView(p); }} className="w-full flex items-center gap-4 px-5 py-3 hover:bg-blush-50 transition text-left">
              <SafeImage src={p.image} alt={p.name} fb={FB(p.category)} label={p.name} className="w-12 h-12 rounded-xl object-cover shrink-0"/>
              <span className="flex-1 min-w-0">
                <span className="block font-medium text-cocoa-700 truncate">{p.name}</span>
                <span className="block text-xs text-cocoa-400">{p.price ? fmt(p.price) : 'Request a quote'}</span>
              </span>
              <Icon name="arrowRight" size={16} className="text-gold-500 shrink-0"/>
            </button>
          ))}
          {results.length === 8 && (
            <button onClick={()=>{ setShopSearch(q); location.hash = '#/shop'; close(); }} className="w-full py-3.5 text-center text-sm font-semibold text-wine-700 hover:bg-wine-50 transition border-t border-gold-200/60">
              View all results in the shop
            </button>
          )}
          {!q && <p className="px-5 py-8 text-center text-cocoa-400 text-sm">Start typing to find your favourite treat…</p>}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PRODUCT CARD + GRID (photo-first, 1 column at 300px)
   ============================================================ */
function ProductCard({p, delay=0}){
  const { favs, toggleFav, addToCart, setQuickView } = useApp();
  const fav = favs.includes(p.id);
  const quote = p.price == null;
  return (
    <article className={`group reveal d${delay%4} flex flex-col bg-white rounded-[1.4rem] overflow-hidden border border-gold-200/60 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-blush-50">
        <a href={`#/product/${p.id}`} aria-label={`View ${p.name}`} className="block h-full w-full">
          <SafeImage src={p.image} alt={`${p.name} — Jamcy’s Bakery`} fb={FB(p.category)} label={p.name}
            className="h-full w-full object-cover"/>
        </a>
        {p.featured && <span className="absolute top-3 left-3 bg-gold-400 text-wine-900 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shadow">Favourite</span>}
        <button onClick={()=>setQuickView(p)} aria-label={`Quick view ${p.name}`}
          className="absolute bottom-3 left-3 icon-btn p-2.5 bg-white/95 text-wine-700 shadow hover:bg-white opacity-0 group-hover:opacity-100 max-md:opacity-100 transition duration-300">
          <Icon name="search" size={16}/>
        </button>
        <button onClick={()=>toggleFav(p)} aria-label={fav?`Remove ${p.name} from favourites`:`Add ${p.name} to favourites`}
          className={`absolute top-3 right-3 icon-btn p-2.5 shadow transition ${fav?'bg-wine-600 text-ivory':'bg-white/95 text-wine-700 hover:bg-white'}`}>
          <Icon name={fav?'heartFill':'heart'} size={16}/>
        </button>
        {p.tag && <span className={`absolute bottom-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow ${TAG_STYLES[p.tag]||'bg-blush-100 text-wine-700'}`}>{p.tag}</span>}
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <a href={`#/product/${p.id}`} className="font-display text-[16px] min-[400px]:text-[17px] leading-snug text-cocoa-700 hover:text-wine-700 transition">{p.name}</a>
        <p className="clamp2 text-[13px] text-cocoa-400 mt-1 leading-relaxed">{p.description}</p>
        <div className="mt-auto pt-3.5 flex items-center justify-between gap-2 flex-wrap">
          <span className="font-display font-semibold text-wine-700 text-[15px] min-[400px]:text-base">{p.price ? fmt(p.price) : <span className="text-[14px]">Request a Quote</span>}</span>
          {quote ? (
            <a href={waLink(`Hello Jamcy’s Bakery, I would like a quote for: ${p.name}.`)} target="_blank" rel="noopener" className="btn btn-outline !py-2 !px-4 text-xs">Enquire</a>
          ) : (
            <button onClick={()=>addToCart(p)} className="btn btn-primary !py-2 !px-4 text-xs"><Icon name="bag" size={14}/> Add to Cart</button>
          )}
        </div>
      </div>
    </article>
  );
}
const ProductGrid = ({items}) => (
  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 min-[420px]:gap-5 gap-y-7 min-[420px]:gap-y-9">
    {items.map((p,i)=><ProductCard key={p.id} p={p} delay={i}/>)}
  </div>
);

/* ============================================================
   PRODUCT DETAILS (page + modal)
   ============================================================ */
function ProductDetailsBody({p, onClose}){
  const { addToCart, favs, toggleFav } = useApp();
  const [qty, setQty] = useState(1);
  const [opts, setOpts] = useState(() => ({
    Size: p.options?.sizes ? p.options.sizes[0] : '',
    Flavor: p.options?.flavors ? p.options.flavors[0] : '',
    Inscription: '', 'Date needed': '',
  }));
  const setOpt = (k,v)=>setOpts((o)=>({...o,[k]:v}));
  const fav = favs.includes(p.id);
  const quote = p.price == null;
  const gallery = (p.gallery && p.gallery.length > 1) ? p.gallery : [p.image];
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="grid md:grid-cols-2 gap-7 md:gap-10">
      <div>
        <div className="relative rounded-[1.5rem] overflow-hidden bg-blush-50 aspect-square shadow-soft">
          <SafeImage src={gallery[activeImg]} alt={`${p.name} — Jamcy’s Bakery`} fb={FB(p.category)} label={p.name} eager className="h-full w-full object-cover"/>
          {p.featured && <span className="absolute top-4 left-4 bg-gold-400 text-wine-900 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow">Customer Favourite</span>}
        </div>
        {gallery.length > 1 && (
          <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
            {gallery.map((g,i)=>(
              <button key={i} onClick={()=>setActiveImg(i)} className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition ${i===activeImg?'border-gold-400':'border-transparent hover:border-gold-200'} shadow-sm`}>
                <SafeImage src={g} alt={`${p.name} view ${i+1}`} fb={FB(p.category)} label={p.name} className="h-full w-full object-cover"/>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-bold tracking-[.14em] uppercase text-gold-600">{p.category.replace('-',' ')}</p>
        <h2 className="h3 font-display font-semibold text-wine-700 leading-tight mt-1.5">{p.name}</h2>
        <div className="flex items-center gap-3 min-[400px]:gap-4 mt-3 flex-wrap">
          <span className="font-display text-[1.35rem] min-[400px]:text-2xl text-wine-600 font-semibold">{p.price ? fmt(p.price) : 'Request a Quote'}</span>
          <button onClick={()=>toggleFav(p)} className={`icon-btn px-3.5 py-2 text-sm gap-1.5 rounded-full border transition ${fav?'bg-wine-600 border-wine-600 text-ivory':'border-wine-600/30 text-wine-700 hover:bg-wine-50'}`}>
            <Icon name={fav?'heartFill':'heart'} size={15}/> {fav?'Saved':'Save'}
          </button>
        </div>
        <p className="text-cocoa-500 leading-relaxed mt-4">{p.description}</p>

        {p.options?.sizes && (
          <div className="mt-5">
            <p className="lbl">Cake size</p>
            <div className="flex flex-wrap gap-2">
              {p.options.sizes.map((s)=>(
                <button key={s} onClick={()=>setOpt('Size',s)} className={`px-3.5 py-2 rounded-full text-[13px] border transition ${opts.Size===s?'bg-wine-700 border-wine-700 text-ivory':'border-cocoa-500/25 text-cocoa-600 hover:border-wine-600'}`}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {p.options?.flavors && (
          <div className="mt-4">
            <p className="lbl">Flavor</p>
            <div className="flex flex-wrap gap-2">
              {p.options.flavors.map((f)=>(
                <button key={f} onClick={()=>setOpt('Flavor',f)} className={`px-3.5 py-2 rounded-full text-[13px] border transition ${opts.Flavor===f?'bg-wine-700 border-wine-700 text-ivory':'border-cocoa-500/25 text-cocoa-600 hover:border-wine-600'}`}>{f}</button>
              ))}
            </div>
          </div>
        )}
        {p.options?.custom && (
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="lbl" htmlFor={`insc-${p.id}`}>Cake inscription</label>
              <input id={`insc-${p.id}`} className="field" placeholder="e.g. Happy Birthday Ada!" value={opts.Inscription} onChange={e=>setOpt('Inscription',e.target.value)}/>
            </div>
            <div>
              <label className="lbl" htmlFor={`date-${p.id}`}>Date needed</label>
              <input id={`date-${p.id}`} type="date" className="field" value={opts['Date needed']} onChange={e=>setOpt('Date needed',e.target.value)}/>
            </div>
          </div>
        )}
        {p.includedItems && (
          <ul className="mt-5 space-y-2">
            {p.includedItems.map((it)=>(
              <li key={it} className="flex items-start gap-2.5 text-[15px] text-cocoa-600"><Icon name="check" size={16} className="text-leaf-500 mt-0.5 shrink-0"/>{it}</li>
            ))}
          </ul>
        )}
        {p.servings && <p className="mt-3 text-sm text-cocoa-400"><Icon name="user" size={14} className="inline mr-1.5 -mt-0.5"/>{p.servings}</p>}

        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <Qty q={qty} set={setQty}/>
          {!quote && <>
            <button onClick={()=>addToCart(p, qty, opts)} className="btn btn-primary flex-1 min-w-[150px]"><Icon name="bag" size={17}/> Add to Cart</button>
            <button onClick={()=>{ addToCart(p, qty, opts, true); location.hash = '#/checkout'; }} className="btn btn-gold flex-1 min-w-[130px]">Buy Now</button>
          </>}
        </div>
        <a href={waLink(productWAMessage(p, qty, opts))} target="_blank" rel="noopener" className="btn btn-wa w-full mt-3">
          <Icon name="whatsapp" size={17}/> {quote ? 'Request Quote on WhatsApp' : 'Order on WhatsApp'}
        </a>
        {p.options?.custom && (
          <a href={waLink(`Hello Jamcy’s Bakery, I would like to request a custom design for: ${p.name}. Here is my idea:`)} target="_blank" rel="noopener" className="btn btn-outline w-full mt-3">
            <Icon name="cake" size={17}/> Request Customization
          </a>
        )}
        <div className="mt-6 pt-5 border-t border-gold-200/70 grid grid-cols-3 gap-1.5 text-center text-[11px] min-[400px]:text-[12px] text-cocoa-500">
          <div><Icon name="truck" size={18} className="mx-auto text-gold-600 mb-1"/>Delivery available</div>
          <div><Icon name="store" size={18} className="mx-auto text-gold-600 mb-1"/>Pickup at bakery</div>
          <div><Icon name="leaf" size={18} className="mx-auto text-gold-600 mb-1"/>Made fresh for you</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGES
   ============================================================ */
function HomePage(){
  const featured = useMemo(()=>PRODUCTS.filter(p=>p.featured).slice(0,8), []);
  const quick = [
    {icon:'truck', title:'Order for Delivery', desc:'Have your favorites delivered to you.', img:IMGS.foodSpread, href:'#/shop', cta:'Start an order'},
    {icon:'store', title:'Order for Pickup', desc:'Place your order and pick it up when ready.', img:IMGS.cupcakes, href:'#/shop', cta:'Reserve for pickup'},
    {icon:'cake', title:'Custom Cakes', desc:'Create a cake for your special occasion.', img:IMGS.chocCake, href:'#/custom-cake', cta:'Design my cake'},
    {icon:'gift', title:'Event & Catering', desc:'Let us handle your celebration treats.', img:IMGS.eventTable, href:'#/catering', cta:'Plan my event'},
  ];
  const collage = [IMGS.chocChip, IMGS.chocStack, IMGS.croissant, IMGS.oatCookies, IMGS.pancakeBerry, IMGS.giftBox];
  const occasions = ['Birthday Cakes','Wedding Cakes','Sign-Out Cakes','Graduation Cakes','Baby Shower Cakes','Corporate Events','Party Packages','Catering'];
  const values = [
    {icon:'leaf', title:'Freshly Made', desc:'Prepared with care for every order.'},
    {icon:'star', title:'Quality Ingredients', desc:'Thoughtfully prepared for delicious results.'},
    {icon:'heart', title:'Made With Love', desc:'Every order is created with attention to detail.'},
    {icon:'bag', title:'Easy Ordering', desc:'Order online or send your order directly through WhatsApp.'},
  ];
  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ivory via-blush-50/70 to-cream">
        <BotanicalSpray className="absolute -left-12 top-6 w-60 opacity-70 hidden md:block"/>
        <BotanicalSpray className="absolute -right-10 bottom-0 w-56 opacity-60 hidden md:block" flip/>
        <Sprinkles className="absolute top-10 left-1/3 w-44 opacity-70 hidden lg:block"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center py-10 lg:py-20">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="font-script text-[clamp(1.8rem,7vw,3rem)] text-gold-500" style={{animation:'fadeUp .8s ease'}}>Freshly baked for you</p>
              <h1 className="h1 font-display font-bold text-wine-700 mt-2" style={{animation:'fadeUp .8s ease .1s both'}}>
                Elegant in <span className="italic text-wine-500">Every</span> Mouthful
              </h1>
              <p className="mt-5 text-base min-[400px]:text-lg text-cocoa-500 max-w-xl mx-auto lg:mx-0" style={{animation:'fadeUp .8s ease .2s both'}}>
                Beautiful cakes, delicious cookies, irresistible snacks and memorable event treats — freshly made with love.
              </p>
              <div className="mt-7 flex flex-col min-[420px]:flex-row flex-wrap justify-center lg:justify-start gap-3" style={{animation:'fadeUp .8s ease .3s both'}}>
                <a href="#/shop" className="btn btn-primary w-full min-[420px]:w-auto"><Icon name="bag" size={18}/> Order Now</a>
                <a href="#/shop" className="btn btn-outline w-full min-[420px]:w-auto">Explore Our Menu</a>
              </div>
              <div className="mt-3.5 flex justify-center lg:justify-start">
                <a href={waLink("Hello Jamcy’s Bakery, I would like to place an order.")} target="_blank" rel="noopener" className="btn btn-wa w-full min-[420px]:w-auto"><Icon name="whatsapp" size={18}/> Order on WhatsApp</a>
              </div>
              <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-[13px] min-[400px]:text-sm text-cocoa-500">
                <span className="inline-flex items-center gap-2"><Icon name="truck" size={16} className="text-gold-600"/> Delivery available</span>
                <span className="inline-flex items-center gap-2"><Icon name="store" size={16} className="text-gold-600"/> Pickup at {BUSINESS.address}</span>
                <span className="inline-flex items-center gap-2"><Icon name="whatsapp" size={16} className="text-leaf-500"/> {BUSINESS.whatsapp}</span>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2" style={{animation:'fadeUp .9s ease .25s both'}}>
              <div className="relative w-full max-w-[300px] min-[400px]:max-w-[380px] md:max-w-[430px]">
                <div className="rounded-arch overflow-hidden shadow-lift aspect-[4/5] border-[5px] min-[400px]:border-[6px] border-white">
                  <SafeImage src={U(IMGS.cupcakes,900)} alt="Blush and cream frosted cupcakes freshly made at Jamcy’s Bakery" label="Cupcakes" eager className="h-full w-full object-cover"/>
                </div>
                <div className="absolute -left-1.5 min-[400px]:-left-8 md:-left-12 bottom-8 w-24 min-[400px]:w-32 md:w-44 aspect-square rounded-[1.2rem] overflow-hidden rotate-[-6deg] border-4 border-white shadow-lift animate-floaty">
                  <SafeImage src={U(IMGS.chocChip,500)} alt="Freshly baked chocolate chip cookies" label="Cookies" className="h-full w-full object-cover"/>
                </div>
                <div className="absolute -right-1.5 min-[400px]:-right-3 top-14 w-20 min-[400px]:w-24 md:w-32 aspect-square rounded-full overflow-hidden rotate-6 border-4 border-white shadow-lift">
                  <SafeImage src={U(IMGS.sparkler,400)} alt="Celebration cake with a golden sparkler" label="Celebration cake" className="h-full w-full object-cover"/>
                </div>
                <div className="absolute -top-7 right-0 w-24 h-24 md:w-28 md:h-28 relative hidden sm:block">
                  <svg viewBox="0 0 120 120" className="animate-spin-slow w-full h-full">
                    <defs><path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>
                    <text fill="#8E1B3F" fontSize="9.5" letterSpacing="2.2" style={{fontFamily:'Jost',fontWeight:600}}>
                      <textPath href="#circ">ELEGANT IN EVERY MOUTHFUL • JAMCY’S BAKERY • </textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-wine-600"><Icon name="cake" size={28}/></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* occasion marquee ribbon */}
      <div className="marquee bg-wine-700 py-3.5" aria-hidden="true">
        <div className="marquee-track text-gold-300 font-display tracking-[.18em] text-[13px] min-[400px]:text-sm uppercase">
          {[0,1].map(k => (
            <React.Fragment key={k}>
              {['Weddings','Birthdays','Graduations','Sign-Outs','Baby Showers','Bridal Showers','Corporate Events','Dessert Tables','Cookie Boxes','Party Packages'].map(t=>(
                <span key={t} className="inline-flex items-center gap-3.5">{t}<span className="text-gold-400 text-[9px]">♥</span></span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ============ QUICK ORDER OPTIONS (photo cards) ============ */}
      <section className="py-14 min-[400px]:py-16 md:py-20" aria-label="Quick order options">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="How would you like it?" title="Quick & Easy Ordering"/>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
            {quick.map((c,i)=>(
              <a key={c.title} href={c.href} className={`group bg-white rounded-[1.5rem] overflow-hidden shadow-card border border-gold-200/60 hover:shadow-soft hover:-translate-y-1.5 transition-all duration-300 reveal d${i} ${i%2===1?'xl:translate-y-5 xl:hover:translate-y-3.5':''}`}>
                <div className="img-tile !rounded-none aspect-[16/10]">
                  <SafeImage src={U(c.img,700)} alt={`${c.title} — Jamcy’s Bakery`} label={c.title} className="absolute inset-0 h-full w-full object-cover"/>
                  <span className="absolute top-3 left-3 w-11 h-11 rounded-xl bg-white/95 text-wine-700 flex items-center justify-center shadow group-hover:bg-wine-700 group-hover:text-gold-300 transition-colors duration-300">
                    <Icon name={c.icon} size={20}/>
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl text-wine-700">{c.title}</h3>
                  <p className="text-sm text-cocoa-500 mt-1.5 leading-relaxed">{c.desc}</p>
                  <span className="mt-3.5 inline-flex items-center gap-2 text-sm font-semibold text-gold-600">
                    {c.cta}<Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-1"/>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORY MOSAIC (all photos) ============ */}
      <section className="py-12 min-[400px]:py-14 md:py-20 bg-white border-y border-gold-200/60" aria-label="Browse our bakery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Browse the shelves" title="Everything We Bake" sub="From everyday treats to grand celebration centrepieces — every category is a little world of delicious."/>
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-4 gap-4 mt-10 min-[400px]:mt-12">
            {CATEGORIES.map((c,i)=>(
              <a key={c.title} href={c.href} className={`group relative overflow-hidden rounded-[1.4rem] shadow-card reveal d${i%4} ${c.big?'min-[400px]:col-span-2 aspect-[16/10] min-[400px]:aspect-[8/5]':'aspect-[16/10] min-[400px]:aspect-[5/4]'}`}>
                <SafeImage src={U(c.img,700)} alt={`${c.title} — Jamcy’s Bakery`} label={c.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b0a14]/70 via-transparent to-transparent"/>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-lg min-[400px]:text-xl md:text-2xl text-white">{c.title}</h3>
                  <p className="text-white/85 text-[12px] md:text-sm mt-0.5">{c.desc}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-gold-300 text-xs md:text-sm font-semibold">Explore <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1"/></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CUSTOMER FAVOURITES ============ */}
      <section className="py-14 min-[400px]:py-16 md:py-24" aria-label="Customer favourites">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Most loved" title="Customer Favorites" sub="The treats our customers keep coming back for — again and again."/>
          <div className="mt-10 min-[400px]:mt-12"><ProductGrid items={featured}/></div>
          <div className="text-center mt-11 reveal"><a href="#/shop" className="btn btn-primary">Shop All Treats <Icon name="arrowRight" size={17}/></a></div>
        </div>
      </section>

      {/* ============ COOKIE PROMOTION (photo collage) ============ */}
      <section className="py-14 min-[400px]:py-16 md:py-24 bg-blush-50 relative overflow-hidden" aria-label="Cookie promotion">
        <BotanicalSpray className="absolute -left-10 -bottom-6 w-48 opacity-50" flip/>
        <Sprinkles className="absolute top-8 right-6 w-56 opacity-90 hidden md:block"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center relative">
          <div className="grid grid-cols-3 gap-2.5 min-[400px]:gap-3 reveal">
            <div className="col-span-2 row-span-2 rounded-[1.3rem] overflow-hidden shadow-soft rotate-[-2deg] border-[3px] min-[400px]:border-4 border-white aspect-[4/3]">
              <SafeImage src={U(collage[0],800)} alt="Tray of golden chocolate chip cookies" label="Chocolate chip cookies" className="h-full w-full object-cover"/>
            </div>
            <div className="rounded-[1.1rem] overflow-hidden shadow-card rotate-2 border-[3px] min-[400px]:border-4 border-white aspect-square"><SafeImage src={U(collage[2],400)} alt="Fresh buttery croissants" label="Croissants" className="h-full w-full object-cover"/></div>
            <div className="rounded-[1.1rem] overflow-hidden shadow-card rotate-[-3deg] border-[3px] min-[400px]:border-4 border-white aspect-square mt-3"><SafeImage src={U(collage[3],400)} alt="Oatmeal cookies with chocolate chunks" label="Oatmeal cookies" className="h-full w-full object-cover"/></div>
            <div className="rounded-[1.1rem] overflow-hidden shadow-card rotate-1 border-[3px] min-[400px]:border-4 border-white aspect-square"><SafeImage src={U(collage[1],400)} alt="Stack of double chocolate cookies" label="Double chocolate" className="h-full w-full object-cover"/></div>
            <div className="rounded-[1.1rem] overflow-hidden shadow-card rotate-3 border-[3px] min-[400px]:border-4 border-white aspect-square mt-2"><SafeImage src={U(collage[5],400)} alt="Gift-wrapped cookie box with ribbon" label="Gift box" className="h-full w-full object-cover"/></div>
          </div>
          <div className="reveal d2">
            <p className="font-script text-[clamp(1.8rem,6.5vw,2.5rem)] text-gold-500">Sweet little things</p>
            <h2 className="h2 font-display font-semibold text-wine-700 leading-tight mt-1">More Cookies. More Reasons to Smile.</h2>
            <Divider className="mt-4 !justify-start"/>
            <p className="mt-4 text-cocoa-500 leading-relaxed max-w-lg">
              From buttery classics to indulgent chocolate creations, discover cookies made for gifting, celebrations and everyday cravings.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Buttery classics','Chocolate indulgence','Gift boxes','Party packs','Cookie boxes for events'].map(t=>(
                <span key={t} className="px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-white border border-gold-300/60 text-wine-700">{t}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-col min-[420px]:flex-row flex-wrap gap-3">
              <a href="#/cookies" className="btn btn-primary w-full min-[420px]:w-auto"><Icon name="cookie" size={17}/> Shop All Cookies</a>
              <a href={waLink("Hello Jamcy’s Bakery, I would like to order cookies. Please share the available flavours.")} target="_blank" rel="noopener" className="btn btn-outline w-full min-[420px]:w-auto"><Icon name="whatsapp" size={16}/> Order cookies on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US (bright, white cards) ============ */}
      <section className="py-14 min-[400px]:py-16 md:py-24 bg-white border-y border-gold-200/60" aria-label="Why choose us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="The Jamcy’s touch" title="Why Choose Us" sub="A small bakery with a big heart — and an obsession with getting every detail right."/>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-4 gap-5 mt-10 min-[400px]:mt-12">
            {values.map((v,i)=>(
              <div key={v.title} className={`bg-blush-50 rounded-[1.5rem] border border-gold-200/70 p-7 text-center reveal d${i} hover:bg-white hover:shadow-soft hover:-translate-y-1 transition-all duration-300`}>
                <span className="w-14 h-14 mx-auto rounded-full bg-white text-wine-700 flex items-center justify-center shadow-card border border-gold-200/70"><Icon name={v.icon} size={24}/></span>
                <h3 className="font-display text-xl text-wine-700 mt-5">{v.title}</h3>
                <p className="text-cocoa-500 text-sm mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EVENT SECTION ============ */}
      <section className="py-14 min-[400px]:py-16 md:py-24 relative overflow-hidden" aria-label="Celebrations">
        <BotanicalSpray className="absolute -left-12 top-10 w-56 opacity-60"/>
        <BotanicalSpray className="absolute -right-12 bottom-6 w-56 opacity-60" flip/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <SectionHeading kicker="Your moment, our craft" title="Celebrations Deserve Something Special" sub="Whatever the occasion, we bake it beautiful — from intimate gatherings to grand celebrations."/>
          <div className="flex flex-wrap justify-center gap-2 min-[400px]:gap-2.5 mt-8 reveal">
            {occasions.map(o=>(
              <span key={o} className="px-3.5 min-[400px]:px-4 py-2 rounded-full bg-white border border-gold-300/60 text-wine-700 text-[13px] min-[400px]:text-sm font-medium shadow-sm">{o}</span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2.5 min-[400px]:gap-4 max-w-2xl mx-auto mt-9 reveal d2">
            {[IMGS.weddingCouple, IMGS.gradThrow2, IMGS.eventTable].map((img,i)=>(
              <div key={i} className={`rounded-[1.2rem] min-[400px]:rounded-[1.4rem] overflow-hidden shadow-card border-[3px] min-[400px]:border-4 border-white aspect-[4/5] ${i===1?'-translate-y-2 min-[400px]:-translate-y-3':''}`}>
                <SafeImage src={U(img,500)} alt={['Elegant wedding celebration','Graduation celebration','Event dessert table'][i]} label="Celebration" className="h-full w-full object-cover"/>
              </div>
            ))}
          </div>
          <div className="text-center mt-11 reveal">
            <a href="#/packages" className="btn btn-primary text-base min-[400px]:text-lg !px-8 min-[400px]:!px-9"><Icon name="calendar" size={18}/> Plan My Event</a>
            <p className="mt-4 text-sm text-cocoa-400">Or call us on <a href={`tel:${BUSINESS.phone}`} className="font-semibold text-wine-700 hover:underline">{BUSINESS.phone}</a></p>
          </div>
        </div>
      </section>

      {/* ============ ABOUT TEASER ============ */}
      <section className="py-14 min-[400px]:py-16 md:py-24 bg-white border-y border-gold-200/60" aria-label="About Jamcy’s Bakery">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="reveal">
            <p className="font-script text-[clamp(1.8rem,6.5vw,2.5rem)] text-gold-500">Our story</p>
            <h2 className="h2 font-display font-semibold text-wine-700 leading-tight mt-1">Baked with Love,<br/>Served with Elegance</h2>
            <Divider className="mt-4 !justify-start"/>
            <p className="mt-5 text-cocoa-500 leading-relaxed text-base min-[400px]:text-[17px]">
              “At Jamcy’s Bakery, we believe every bite should feel special. From beautifully crafted cakes and buttery cookies to delicious snacks and event catering, we create treats designed to make everyday moments and special celebrations memorable.”
            </p>
            <a href="#/about" className="btn btn-outline mt-7">Read Our Story <Icon name="arrowRight" size={16}/></a>
          </div>
          <div className="relative reveal d2">
            <div className="rounded-arch overflow-hidden shadow-lift aspect-[4/5] max-w-md mx-auto border-[5px] border-cream">
              <SafeImage src={U(IMGS.bdayKid,700)} alt="A colourful birthday cake decorated at Jamcy’s Bakery" label="Our bakes" className="h-full w-full object-cover"/>
            </div>
            <div className="absolute -bottom-4 left-2 min-[400px]:left-6 bg-white rounded-2xl shadow-lift px-5 py-3.5 border border-gold-200/70 rotate-[-3deg]">
              <p className="font-script text-2xl text-gold-500">with love,</p>
              <p className="font-display font-semibold text-wine-700 text-sm tracking-wide">JAMCY’S BAKERY</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA BAND ============ */}
      <section className="py-14 min-[400px]:py-16 md:py-20 bg-wine-700 relative overflow-hidden" aria-label="Contact">
        <BotanicalSpray className="absolute -left-8 -bottom-10 w-48 opacity-25"/>
        <BotanicalSpray className="absolute -right-8 -top-10 w-48 opacity-25" flip/>
        <div className="max-w-3xl mx-auto px-4 text-center relative reveal">
          <p className="font-script text-[clamp(1.8rem,6.5vw,2.5rem)] text-gold-300">Craving something sweet?</p>
          <h2 className="h2 font-display font-semibold text-ivory mt-2">Let’s Get Your Order Started</h2>
          <p className="text-cream/90 mt-3">WhatsApp us on <strong className="text-gold-300">{BUSINESS.whatsapp}</strong> for orders, delivery and pickup — or call the bakery on {BUSINESS.phone}.</p>
          <div className="mt-7 flex flex-col min-[420px]:flex-row flex-wrap justify-center gap-3">
            <a href={waLink("Hello Jamcy’s Bakery, I would like to place an order.")} target="_blank" rel="noopener" className="btn btn-wa w-full min-[420px]:w-auto"><Icon name="whatsapp" size={18}/> WhatsApp Us</a>
            <a href={`tel:${BUSINESS.phone}`} className="btn btn-light w-full min-[420px]:w-auto"><Icon name="phone" size={17}/> Call Bakery</a>
            <a href="#/shop" className="btn btn-outline !border-ivory/70 !text-ivory !bg-transparent hover:!bg-ivory hover:!text-wine-700 w-full min-[420px]:w-auto">Order Now</a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- SHOP ---------------- */
function ShopPage(){
  const { favs, shopSearch } = useApp();
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('featured');
  const [price, setPrice] = useState('all');
  const [favOnly, setFavOnly] = useState(false);
  useEffect(()=>{ if (shopSearch) { setQ(shopSearch); setCat('all'); } }, [shopSearch]);
  const list = useMemo(()=>{
    let l = PRODUCTS.filter(p => cat==='all' || p.category===cat);
    if (favOnly) l = l.filter(p=>favs.includes(p.id));
    const ql = q.trim().toLowerCase();
    if (ql) l = l.filter(p=>(p.name+' '+p.description).toLowerCase().includes(ql));
    if (price==='u5') l = l.filter(p=>p.price!=null&&p.price<5000);
    if (price==='5-15') l = l.filter(p=>p.price!=null&&p.price>=5000&&p.price<=15000);
    if (price==='15-30') l = l.filter(p=>p.price!=null&&p.price>15000&&p.price<=30000);
    if (price==='o30') l = l.filter(p=>p.price!=null&&p.price>30000);
    if (sort==='low') l = [...l].sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
    else if (sort==='high') l = [...l].sort((a,b)=>(b.price??-1)-(a.price??-1));
    else if (sort==='popular') l = [...l].sort((a,b)=>(b.pop||0)-(a.pop||0));
    else l = [...l].sort((a,b)=>((b.featured?1:0)-(a.featured?1:0)) || ((b.pop||0)-(a.pop||0)));
    return l;
  },[cat,q,sort,price,favOnly,favs]);
  return (
    <main>
      <PageHero kicker="Our full menu" title="The Bakery Shop" sub="Browse everything we bake — filter by category, price or popularity, and add your favourites straight to the basket." sprinkles/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3.5 mb-6">
          <div className="relative flex-1 max-w-md">
            <Icon name="search" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-cocoa-400"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search the shop…" className="field !pl-11" aria-label="Search products"/>
          </div>
          <div className="flex flex-wrap gap-2.5 lg:ml-auto">
            <select value={price} onChange={e=>setPrice(e.target.value)} className="field !w-auto flex-1 min-[480px]:flex-none !py-2.5 text-sm" aria-label="Filter by price">
              <option value="all">Any price</option><option value="u5">Under ₦5,000</option><option value="5-15">₦5,000 – ₦15,000</option>
              <option value="15-30">₦15,000 – ₦30,000</option><option value="o30">Over ₦30,000</option>
            </select>
            <select value={sort} onChange={e=>setSort(e.target.value)} className="field !w-auto flex-1 min-[480px]:flex-none !py-2.5 text-sm" aria-label="Sort products">
              <option value="featured">Sort: Featured</option><option value="popular">Sort: Popularity</option>
              <option value="low">Price: Low to High</option><option value="high">Price: High to Low</option>
            </select>
            <button onClick={()=>setFavOnly(f=>!f)} className={`btn !py-2.5 !px-4 min-[480px]:!px-5 text-sm flex-1 min-[480px]:flex-none ${favOnly?'btn-primary':'btn-outline'}`}><Icon name={favOnly?'heartFill':'heart'} size={15}/> Favourites</button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Product categories">
          {SHOP_FILTERS.map(f=>(
            <button key={f.key} onClick={()=>setCat(f.key)} role="tab" aria-selected={cat===f.key}
              className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-medium border transition ${cat===f.key?'bg-wine-700 border-wine-700 text-ivory shadow':'bg-white border-gold-300/60 text-cocoa-600 hover:border-wine-600 hover:text-wine-700'}`}>{f.label}</button>
          ))}
        </div>
        <p className="text-sm text-cocoa-400 mt-4 mb-7">{list.length} {list.length===1?'product':'products'}{q?` for “${q}”`:''}</p>
        {list.length ? <ProductGrid items={list}/> : (
          <div className="text-center py-16">
            <span className="inline-flex w-16 h-16 rounded-full bg-blush-100 text-wine-600 items-center justify-center"><Icon name="search" size={26}/></span>
            <p className="font-display text-2xl text-wine-700 mt-5">Nothing found</p>
            <p className="text-cocoa-500 mt-2">Try a different search or category — or ask us on WhatsApp.</p>
            <a href={waLink("Hello Jamcy’s Bakery, I am looking for something specific. Can you help?")} target="_blank" rel="noopener" className="btn btn-wa mt-6"><Icon name="whatsapp" size={16}/> Ask on WhatsApp</a>
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------------- COOKIES ---------------- */
function CookiesPage(){
  const classics = PRODUCTS.filter(p=>p.category==='cookie' && p.sub!=='box');
  const boxes = PRODUCTS.filter(p=>p.category==='cookie' && p.sub==='box');
  return (
    <main>
      <section className="relative overflow-hidden bg-wine-700">
        <Sprinkles className="absolute top-6 left-8 w-56 opacity-90 hidden md:block"/>
        <Sprinkles className="absolute bottom-6 right-8 w-56 opacity-90 hidden md:block"/>
        <BotanicalSpray className="absolute -right-10 -top-10 w-52 opacity-25" flip/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center relative">
          <p className="font-script text-[clamp(1.8rem,6.5vw,2.5rem)] text-gold-300">Buttery, crunchy &amp; absolutely yummy!</p>
          <h1 className="h1 font-display font-bold text-ivory mt-2">Our Cookie Collection</h1>
          <Divider className="mt-4"/>
          <p className="text-cream/90 max-w-2xl mx-auto mt-4">Every cookie is baked fresh in small batches — crisp edges, soft centres and flavours for every craving. Tap any cookie to view, save or order it instantly.</p>
          <div className="mt-7 flex flex-col min-[420px]:flex-row flex-wrap justify-center gap-3">
            <a href={waLink("Hello Jamcy’s Bakery, I would like to order cookies. Please share the available flavours.")} target="_blank" rel="noopener" className="btn btn-wa w-full min-[420px]:w-auto"><Icon name="whatsapp" size={17}/> Order on WhatsApp</a>
            <a href="#/shop" className="btn btn-light w-full min-[420px]:w-auto">Browse the Full Shop</a>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <SectionHeading kicker="Baked today" title="Classic & Everyday Cookies"/>
        <div className="mt-10 min-[400px]:mt-12"><ProductGrid items={classics}/></div>
      </section>
      <section className="bg-white border-y border-gold-200/60 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Wrapped with a ribbon" title="Cookie Boxes & Gifting" sub="Beautifully packed boxes for gifts, parties and corporate treats."/>
          <div className="mt-10 min-[400px]:mt-12"><ProductGrid items={boxes}/></div>
        </div>
      </section>
      <section className="py-14 text-center px-4">
        <div className="max-w-2xl mx-auto reveal">
          <Sprinkles className="w-52 mx-auto"/>
          <h2 className="h3 font-display text-wine-700 font-semibold mt-2">Need a custom cookie box?</h2>
          <p className="text-cocoa-500 mt-3">Tell us the occasion and we will put together the perfect mix — branded boxes available for corporate orders.</p>
          <a href={waLink("Hello Jamcy’s Bakery, I would like a custom cookie box. Here are the details:")} target="_blank" rel="noopener" className="btn btn-primary mt-6">Build My Cookie Box</a>
        </div>
      </section>
    </main>
  );
}

/* ---------------- CAKES ---------------- */
function CakesPage(){
  const [sub, setSub] = useState('all');
  const cakes = PRODUCTS.filter(p=>p.category==='cake'||p.category==='event-cake');
  const subs = [{key:'all',label:'All Cakes'},{key:'birthday',label:'Birthday'},{key:'celebration',label:'Celebration'},{key:'anniversary',label:'Anniversary'},{key:'graduation',label:'Graduation'},{key:'baby-shower',label:'Baby Shower'},{key:'corporate',label:'Corporate'},{key:'custom',label:'Custom'}];
  const list = cakes.filter(c=>sub==='all'||c.sub===sub);
  return (
    <main>
      <PageHero kicker="Soft, sweet & made to delight" title="Cakes for Every Moment" sub="From simple birthday classics to luxury show-stoppers — choose a size and flavour, personalise the inscription, and we bake it fresh for your date."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {subs.map(s=>(
            <button key={s.key} onClick={()=>setSub(s.key)} className={`px-4 min-[400px]:px-5 py-2.5 rounded-full text-sm font-medium border transition ${sub===s.key?'bg-wine-700 border-wine-700 text-ivory shadow':'bg-white border-gold-300/60 text-cocoa-600 hover:border-wine-600 hover:text-wine-700'}`}>{s.label}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <a href="#/wedding-cakes" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-wine-700">Wedding Cakes <Icon name="arrowRight" size={14}/></a>
          <span className="text-gold-400">•</span>
          <a href="#/signout-cakes" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-wine-700">Sign-Out Cakes <Icon name="arrowRight" size={14}/></a>
          <span className="text-gold-400">•</span>
          <a href="#/custom-cake" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-wine-700">Custom Cake Request <Icon name="arrowRight" size={14}/></a>
        </div>
        <ProductGrid items={list}/>
      </div>
    </main>
  );
}

/* ---------------- SNACKS ---------------- */
function SnacksPage(){
  const snacks = PRODUCTS.filter(p=>p.category==='snack'||p.category==='pastry');
  return (
    <main>
      <PageHero kicker="Perfect bites for every occasion" title="Snacks & Pastries" sprinkles
        sub="Fish rolls, meat pies, samosas, puff puff and more — fresh from the oven, perfect for offices, parties and everyday cravings."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <ProductGrid items={snacks}/>
        <div className="mt-12 bg-white rounded-[1.6rem] border border-gold-200/70 shadow-card p-5 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-5 md:gap-6 reveal">
          <div className="img-tile w-full md:w-52 aspect-[16/10] md:aspect-square shrink-0">
            <SafeImage src={U(IMGS.foodSpread,700)} alt="A generous tray of party snacks and small chops" label="Snack trays" className="absolute inset-0 h-full w-full object-cover"/>
          </div>
          <div className="text-center md:text-left">
            <h2 className="h3 font-display text-wine-700">Feeding a crowd?</h2>
            <p className="text-cocoa-500 mt-1.5">Our small chops trays and snack boxes are made for parties, meetings and events — order ahead and we will have them hot and ready.</p>
          </div>
          <a href={waLink("Hello Jamcy’s Bakery, I would like to order snack trays for an event. Details:")} target="_blank" rel="noopener" className="btn btn-primary md:ml-auto shrink-0 w-full md:w-auto"><Icon name="whatsapp" size={16}/> Order Trays</a>
        </div>
      </div>
    </main>
  );
}

/* ---------------- EVENTS HUB ---------------- */
function EventsPage(){
  const cards = [
    {t:'Birthday Cakes', d:'Every age, every theme, every colour.', img:IMGS.bdayCandles, href:'#/cakes'},
    {t:'Wedding Cakes', d:'Tiered elegance for your big day.', img:IMGS.weddingTable, href:'#/wedding-cakes'},
    {t:'Sign-Out Cakes', d:'A sweet farewell to remember.', img:IMGS.gradThrow, href:'#/signout-cakes'},
    {t:'Graduation Cakes', d:'Celebrate the achievement in style.', img:IMGS.gradThrow2, href:'#/cakes'},
    {t:'Baby Shower Cakes', d:'Soft pastels and sweet details.', img:IMGS.baby, href:'#/cakes'},
    {t:'Corporate Events', d:'Polished, branded, boardroom-ready.', img:IMGS.fineDining, href:'#/catering'},
    {t:'Party Packages', d:'Complete spreads, zero stress.', img:IMGS.eventTable, href:'#/packages'},
    {t:'Catering', d:'Catering made beautiful.', img:IMGS.foodSpread, href:'#/catering'},
  ];
  return (
    <main>
      <PageHero kicker="Your moment, our craft" title="Celebrations Deserve Something Special"
        sub="Pick a path below — or jump straight to a full event package and let us handle everything sweet."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c,i)=>(
            <a key={c.t} href={c.href} className={`group relative overflow-hidden rounded-[1.4rem] aspect-[4/3] min-[420px]:aspect-[4/5] shadow-card reveal d${i%4}`}>
              <SafeImage src={U(c.img,700)} alt={`${c.t} — Jamcy’s Bakery`} label={c.t} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.07]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b0a14]/75 via-[#2b0a14]/10 to-transparent"/>
              <div className="absolute inset-x-0 bottom-0 p-4 min-[420px]:p-5">
                <h2 className="font-display text-lg min-[420px]:text-xl text-white">{c.t}</h2>
                <p className="text-white/85 text-[13px] min-[420px]:text-sm mt-1">{c.d}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-gold-300 text-sm font-semibold">Explore <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1"/></span>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-14 reveal">
          <a href="#/packages" className="btn btn-primary text-base min-[400px]:text-lg !px-8 min-[400px]:!px-9"><Icon name="gift" size={18}/> Plan My Event</a>
        </div>
      </div>
    </main>
  );
}

/* ---------------- WEDDING CAKES ---------------- */
function WeddingPage(){
  const wedding = PRODUCTS.filter(p=>p.category==='wedding-cake');
  const fields = [
    {name:'name',label:'Full Name',type:'text',required:true,half:true},
    {name:'phone',label:'Phone Number',type:'tel',required:true,half:true},
    {name:'email',label:'Email',type:'email',half:true},
    {name:'date',label:'Wedding Date',type:'date',half:true},
    {name:'guests',label:'Number of Guests',type:'number',half:true},
    {name:'tiers',label:'Number of Tiers',type:'select',options:['1 tier','2 tiers','3 tiers','4 tiers','Not sure yet'],half:true},
    {name:'flavor',label:'Preferred Flavor',type:'select',options:[...CAKE_FLAVORS,'Combination'],half:true},
    {name:'design',label:'Preferred Design',type:'textarea'},
    {name:'budget',label:'Budget Range',type:'select',options:['Under ₦50,000','₦50,000 – ₦100,000','₦100,000 – ₦250,000','Above ₦250,000','Not sure yet'],half:true},
    {name:'location',label:'Delivery Location',type:'text',half:true},
    {name:'details',label:'Additional Details',type:'textarea'},
  ];
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="relative h-[42vh] min-h-[300px]">
          <SafeImage src={U(IMGS.weddingCouple,1400)} alt="An elegant wedding celebration at Jamcy’s Bakery" label="Wedding cakes" eager className="absolute inset-0 h-full w-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b0a14]/80 via-[#2b0a14]/25 to-transparent"/>
          <div className="absolute inset-0 flex items-end justify-center pb-10 px-4 text-center">
            <div>
              <p className="font-script text-[clamp(1.8rem,6.5vw,2.5rem)] text-gold-300">Two hearts, one cake</p>
              <h1 className="h1 font-display font-bold text-white mt-1">Wedding Cakes</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <SectionHeading kicker="The wedding gallery" title="Tiered, Floral & Timeless" sub="Every wedding cake is designed around your story — flavours, florals, palette and finish."/>
        <div className="mt-10 min-[400px]:mt-12"><ProductGrid items={wedding}/></div>
      </section>
      <section className="bg-white border-y border-gold-200/60 py-14" id="wedding-quote">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Let’s talk details" title="Request a Wedding Cake Quote" sub="Share your plans and we will come back with a beautiful proposal — tastings available for booked weddings."/>
          <div className="mt-10"><EnquiryForm fields={fields} submitLabel="Request Wedding Cake" messageTitle="WEDDING CAKE REQUEST — Jamcy’s Bakery"/></div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- SIGN-OUT CAKES ---------------- */
function SignOutPage(){
  const signout = PRODUCTS.filter(p=>p.category==='signout-cake');
  const fields = [
    {name:'name',label:'Your Name',type:'text',required:true,half:true},
    {name:'phone',label:'Phone Number',type:'tel',required:true,half:true},
    {name:'school',label:'School / University',type:'text',required:true,half:true},
    {name:'date',label:'Graduation Date',type:'date',half:true},
    {name:'size',label:'Cake Size',type:'select',options:CAKE_SIZES,half:true},
    {name:'flavor',label:'Flavor',type:'select',options:CAKE_FLAVORS,half:true},
    {name:'color',label:'Colour Theme',type:'text',placeholder:'e.g. School colours — wine & gold',half:true},
    {name:'delivery',label:'Delivery or Pickup',type:'select',options:['Delivery','Pickup at 60 Housing Estate'],half:true},
    {name:'message',label:'Message on Cake',type:'text',placeholder:'e.g. Class of 2025 — We did it!'},
    {name:'design',label:'Design Preference',type:'select',options:['Buttercream finish','Fondant finish','Photo print','Simple & elegant','Surprise us!'],half:true},
    {name:'details',label:'Additional Details',type:'textarea'},
  ];
  return (
    <main>
      <PageHero kicker="Class dismissed — cake time!" title="Sign-Out Cakes"
        sub="Send-off cakes for schools, universities and classes — names, faces, inside jokes and school colours, all baked in."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <ProductGrid items={signout}/>
      </div>
      <section className="bg-blush-50 border-y border-gold-200/60 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Make it personal" title="Request Your Sign-Out Cake" sub="Fill this in and we will design a send-off cake your set will never forget."/>
          <div className="mt-10"><EnquiryForm fields={fields} submitLabel="Request Sign-Out Cake" messageTitle="SIGN-OUT CAKE REQUEST — Jamcy’s Bakery"/></div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- EVENT PACKAGES ---------------- */
function PackagesPage(){
  const { setPkgEnquiry } = useApp();
  const pkgs = PRODUCTS.filter(p=>p.category==='package');
  return (
    <main>
      <PageHero kicker="Everything handled" title="Event Packages"
        sub="Complete celebration spreads — cake, treats and styling, planned around your guest count and theme. Request a quote and we take it from there."/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-5 min-[480px]:gap-6">
          {pkgs.map((p,i)=><EventPackageCard key={p.id} p={p} delay={i}/>)}
        </div>
        <div className="mt-14 bg-wine-700 rounded-[1.8rem] p-7 sm:p-10 md:p-12 text-center relative overflow-hidden reveal">
          <BotanicalSpray className="absolute -left-8 -bottom-10 w-44 opacity-25"/>
          <BotanicalSpray className="absolute -right-8 -top-10 w-44 opacity-25" flip/>
          <p className="font-script text-[clamp(1.8rem,6.5vw,2.5rem)] text-gold-300 relative">Not sure which package?</p>
          <h2 className="h3 font-display text-ivory font-semibold mt-2 relative">Tell us about your event — we will build one around it.</h2>
          <div className="mt-6 flex flex-col min-[420px]:flex-row flex-wrap justify-center gap-3 relative">
            <button onClick={()=>setPkgEnquiry({id:'custom', name:'Custom Event Package'})} className="btn btn-gold w-full min-[420px]:w-auto"><Icon name="gift" size={17}/> Request a Custom Package</button>
            <a href="#/catering" className="btn btn-light w-full min-[420px]:w-auto">Explore Catering Services</a>
          </div>
        </div>
      </div>
    </main>
  );
}
function EventPackageCard({p, delay=0}){
  const { setPkgEnquiry } = useApp();
  return (
    <article className={`bg-white rounded-[1.6rem] overflow-hidden shadow-card border border-gold-200/70 flex flex-col reveal d${delay%4} hover:shadow-soft hover:-translate-y-1 transition-all duration-300`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-blush-50">
        <SafeImage src={p.image} alt={`${p.name} — Jamcy’s Bakery`} fb={FB(p.category)} label={p.name} className="h-full w-full object-cover"/>
        <span className="absolute top-3 left-3 bg-white/95 text-wine-700 text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow">{p.servings}</span>
      </div>
      <div className="p-5 min-[400px]:p-6 flex flex-col flex-1">
        <h2 className="font-display text-xl text-wine-700">{p.name}</h2>
        <p className="text-sm text-cocoa-500 mt-1.5">{p.description}</p>
        <ul className="mt-4 space-y-2 flex-1">
          {p.includedItems.map((it)=>(
            <li key={it} className="flex items-start gap-2 text-sm text-cocoa-600"><Icon name="check" size={15} className="text-leaf-500 mt-0.5 shrink-0"/>{it}</li>
          ))}
        </ul>
        <div className="mt-5 pt-4 border-t border-gold-200/70 flex items-center justify-between gap-3 flex-wrap">
          <span className="font-display text-lg text-wine-700">Request a Quote</span>
          <button onClick={()=>setPkgEnquiry(p)} className="btn btn-primary !py-2.5 !px-5 text-sm">Request Package</button>
        </div>
      </div>
    </article>
  );
}

/* ---------------- CATERING (photo service tiles) ---------------- */
function CateringPage(){
  const services = [
    {icon:'utensils',t:'Event Catering',img:IMGS.eventTable},
    {icon:'cake',t:'Birthday Catering',img:IMGS.bdayCandles},
    {icon:'heart',t:'Wedding Catering',img:IMGS.weddingTable},
    {icon:'user',t:'Corporate Catering',img:IMGS.fineDining},
    {icon:'gift',t:'Small Party Catering',img:IMGS.balloons},
    {icon:'leaf',t:'Outdoor Event Catering',img:IMGS.picnic},
    {icon:'cookie',t:'Pastry & Snack Catering',img:IMGS.croissant},
    {icon:'star',t:'Dessert Tables',img:IMGS.dessertCups},
    {icon:'cake',t:'Cake & Dessert Packages',img:IMGS.strawberry},
    {icon:'calendar',t:'Custom Event Menus',img:IMGS.foodBowl},
  ];
  const fields = [
    {name:'name',label:'Full Name',type:'text',required:true,half:true},
    {name:'phone',label:'Phone Number',type:'tel',required:true,half:true},
    {name:'email',label:'Email',type:'email',half:true},
    {name:'type',label:'Event Type',type:'select',options:['Wedding','Birthday','Corporate Event','Baby Shower','Bridal Shower','Graduation / Sign-Out','Church Event','Other'],half:true},
    {name:'date',label:'Event Date',type:'date',half:true},
    {name:'guests',label:'Number of Guests',type:'number',half:true},
    {name:'location',label:'Event Location',type:'text',half:true},
    {name:'services',label:'Services Needed',type:'checkboxgroup',options:['Event Catering','Birthday Catering','Wedding Catering','Corporate Catering','Small Party Catering','Outdoor Event Catering','Pastry & Snack Catering','Dessert Tables','Cake & Dessert Packages','Custom Event Menu']},
    {name:'budget',label:'Estimated Budget',type:'select',options:['Under ₦50,000','₦50,000 – ₦100,000','₦100,000 – ₦250,000','₦250,000 – ₦500,000','Above ₦500,000','Not sure yet'],half:true},
    {name:'requirements',label:'Additional Requirements',type:'textarea'},
  ];
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-cream border-b border-gold-200/60">
        <BotanicalSpray className="absolute -left-10 -top-8 w-52 opacity-60 hidden md:block" flip/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 grid lg:grid-cols-2 gap-9 lg:gap-10 items-center relative">
          <div className="text-center lg:text-left">
            <p className="font-script text-[clamp(1.8rem,7vw,3rem)] text-gold-500">Catering</p>
            <h1 className="h1 font-display font-bold text-wine-700 mt-1">Catering Made Beautiful</h1>
            <Divider className="mt-4 lg:!justify-start"/>
            <p className="mt-4 text-cocoa-500 text-base min-[400px]:text-lg leading-relaxed">From intimate gatherings to special celebrations, Jamcy’s Bakery can help make your event memorable with delicious food, pastries, cakes and treats.</p>
            <div className="mt-7 flex flex-col min-[420px]:flex-row justify-center lg:justify-start gap-3">
              <a href="#catering-form" className="btn btn-primary w-full min-[420px]:w-auto">Request Catering Quote</a>
              <a href={waLink("Hello Jamcy’s Bakery, I would like to enquire about catering. Here are my event details:")} target="_blank" rel="noopener" className="btn btn-wa w-full min-[420px]:w-auto"><Icon name="whatsapp" size={17}/> WhatsApp Us</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 min-[400px]:gap-4">
            <div className="img-tile aspect-[4/5] mt-6"><SafeImage src={U(IMGS.eventTable,600)} alt="A beautifully catered event table with food and desserts" label="Event catering" className="absolute inset-0 h-full w-full object-cover"/></div>
            <div className="img-tile aspect-[4/5]"><SafeImage src={U(IMGS.bbq,600)} alt="Grilled treats served at an outdoor catering event" label="Outdoor catering" className="absolute inset-0 h-full w-full object-cover"/></div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <SectionHeading kicker="What we do" title="Our Catering Services"/>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 min-[400px]:gap-4 mt-9 min-[400px]:mt-10">
          {services.map((s,i)=>(
            <div key={s.t} className={`img-tile aspect-[4/3] reveal d${i%4}`}>
              <SafeImage src={U(s.img,500)} alt={`${s.t} — Jamcy’s Bakery catering`} label={s.t} className="absolute inset-0 h-full w-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2b0a14]/70 via-transparent to-transparent"/>
              <div className="absolute inset-x-0 bottom-0 p-2.5 min-[400px]:p-3.5 flex items-center gap-2">
                <span className="w-8 h-8 min-[400px]:w-9 min-[400px]:h-9 rounded-lg bg-white/95 text-wine-700 flex items-center justify-center shrink-0 shadow"><Icon name={s.icon} size={16}/></span>
                <span className="text-white font-semibold text-[12px] min-[400px]:text-sm leading-tight">{s.t}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-4 min-[480px]:gap-5 mt-11">
          {[
            {n:'1',t:'Tell us your plan',d:'Share your date, guests and vision through the form or WhatsApp.'},
            {n:'2',t:'We confirm the menu',d:'We refine the menu, quantities and styling around your budget.'},
            {n:'3',t:'We bake & deliver',d:'Everything arrives fresh, beautiful and right on time.'},
          ].map(s=>(
            <div key={s.n} className="relative bg-blush-50 rounded-[1.4rem] p-6 border border-gold-200/70 reveal">
              <span className="font-display text-5xl text-gold-400/80 font-bold">{s.n}</span>
              <h3 className="font-display text-xl text-wine-700 mt-2">{s.t}</h3>
              <p className="text-sm text-cocoa-500 mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="catering-form" className="bg-white border-y border-gold-200/60 py-14 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Let’s plan it together" title="Request Catering Quote" sub="Tell us about your event and we will respond with a tailored proposal."/>
          <div className="mt-10"><EnquiryForm fields={fields} submitLabel="Send Catering Request" messageTitle="CATERING REQUEST — Jamcy’s Bakery"/></div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- CUSTOM CAKE ---------------- */
function CustomCakePage(){
  const fields = [
    {name:'name',label:'Name',type:'text',required:true,half:true},
    {name:'phone',label:'Phone Number',type:'tel',required:true,half:true},
    {name:'email',label:'Email',type:'email',half:true},
    {name:'type',label:'Event Type',type:'select',options:['Birthday','Wedding','Sign-Out','Baby Shower','Bridal Shower','Anniversary','Graduation','Corporate','Just because'],half:true},
    {name:'caketype',label:'Cake Type',type:'select',options:['Round tiered cake','Single tier cake','Sheet cake','Cupcake cake','Photo cake','Novelty / themed cake'],half:true},
    {name:'size',label:'Cake Size',type:'select',options:CAKE_SIZES,half:true},
    {name:'flavor',label:'Flavor',type:'select',options:[...CAKE_FLAVORS,'Combination'],half:true},
    {name:'filling',label:'Filling',type:'select',options:['Vanilla cream','Chocolate ganache','Strawberry','Buttercream','Caramel'],half:true},
    {name:'colors',label:'Preferred Colors',type:'text',placeholder:'e.g. blush pink, gold & cream',half:true},
    {name:'theme',label:'Theme',type:'text',placeholder:'e.g. garden florals, basketball, princess',half:true},
    {name:'inscription',label:'Cake Inscription',type:'text',placeholder:'e.g. Happy 30th Ada!'},
    {name:'date',label:'Event Date',type:'date',half:true},
    {name:'delivery',label:'Delivery or Pickup',type:'select',options:['Delivery','Pickup at 60 Housing Estate'],half:true},
    {name:'details',label:'Additional Details',type:'textarea',placeholder:'Tell us everything — inspiration, guests, must-haves…'},
    {name:'inspo',label:'Inspiration Image (optional)',type:'file'},
  ];
  return (
    <main>
      <PageHero kicker="Your imagination, our buttercream" title="Custom Cake Request"
        sub="Share your vision below — colours, theme, inscription and all. Prefer to chat it through? Send it straight to us on WhatsApp."/>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-[1.7rem] border border-gold-200/70 shadow-card p-4 min-[400px]:p-6 md:p-10">
          <EnquiryForm fields={fields} submitLabel="Request My Custom Cake" messageTitle="CUSTOM CAKE REQUEST — Jamcy’s Bakery"
            intro={<p className="text-sm text-cocoa-500 mb-6 flex items-start gap-2"><Icon name="star" size={16} className="text-gold-500 mt-0.5 shrink-0"/>The more detail you share, the closer we can get to your dream cake. If you have an inspiration photo, attach it below — then send it to us on WhatsApp after submitting.</p>}/>
        </div>
        <div className="text-center mt-8">
          <a href={waLink("Hello Jamcy’s Bakery, I would like to discuss a custom cake idea with you.")} target="_blank" rel="noopener" className="btn btn-wa w-full min-[480px]:w-auto"><Icon name="whatsapp" size={17}/> Discuss My Cake on WhatsApp — {BUSINESS.whatsapp}</a>
        </div>
      </div>
    </main>
  );
}

/* ---------------- ABOUT ---------------- */
function AboutPage(){
  const values = [
    {icon:'leaf', title:'Freshly Made', desc:'Prepared with care for every order.'},
    {icon:'star', title:'Quality Ingredients', desc:'Thoughtfully prepared for delicious results.'},
    {icon:'heart', title:'Made With Love', desc:'Every order is created with attention to detail.'},
    {icon:'bag', title:'Easy Ordering', desc:'Order online or send your order directly through WhatsApp.'},
  ];
  return (
    <main>
      <PageHero kicker="Our story" title="About Jamcy’s Bakery" sub="Elegant in Every Mouthful — and proud of it."/>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="reveal">
          <p className="font-script text-[clamp(1.8rem,6.5vw,2.5rem)] text-gold-500">Made with love</p>
          <h2 className="h2 font-display font-semibold text-wine-700 leading-tight mt-1">Every Bite Should Feel Special</h2>
          <Divider className="mt-4 !justify-start"/>
          <p className="mt-5 text-cocoa-500 leading-relaxed text-base min-[400px]:text-[17px]">
            “At Jamcy’s Bakery, we believe every bite should feel special. From beautifully crafted cakes and buttery cookies to delicious snacks and event catering, we create treats designed to make everyday moments and special celebrations memorable.”
          </p>
          <p className="mt-4 text-cocoa-500 leading-relaxed">
            Whether it is a Tuesday craving for chocolate chip cookies, a sign-out cake the whole class will sign, or a wedding centrepiece that leaves guests speechless — we bake it fresh, we bake it beautiful, and we treat every order like it is for family.
          </p>
          <div className="mt-7 flex flex-col min-[420px]:flex-row gap-3">
            <a href="#/shop" className="btn btn-primary w-full min-[420px]:w-auto">Taste for Yourself</a>
            <a href="#/contact" className="btn btn-outline w-full min-[420px]:w-auto">Get in Touch</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 min-[400px]:gap-4 reveal d2">
          <div className="img-tile aspect-[4/5] mt-6"><SafeImage src={U(IMGS.chocCake,600)} alt="Rich chocolate layer cake made at Jamcy’s Bakery" label="Our cakes" className="absolute inset-0 h-full w-full object-cover"/></div>
          <div className="img-tile aspect-[4/5]"><SafeImage src={U(IMGS.cinnamon,600)} alt="Soft cinnamon rolls fresh from the oven" label="Our pastries" className="absolute inset-0 h-full w-full object-cover"/></div>
          <div className="col-span-2 img-tile aspect-[16/9]"><SafeImage src={U(IMGS.bdayCandles,800)} alt="A celebration cake glowing with candles" label="Our celebration cakes" className="absolute inset-0 h-full w-full object-cover"/></div>
        </div>
      </section>
      <section className="bg-blush-50 border-y border-gold-200/60 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Our promise" title="Why Choose Us"/>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-4 gap-4 min-[480px]:gap-5 mt-9 min-[400px]:mt-10">
            {values.map((v,i)=>(
              <div key={v.title} className={`bg-white rounded-[1.5rem] border border-gold-200/70 shadow-card p-7 text-center reveal d${i} hover:-translate-y-1 hover:shadow-soft transition-all duration-300`}>
                <span className="w-14 h-14 mx-auto rounded-full bg-wine-50 text-wine-700 flex items-center justify-center"><Icon name={v.icon} size={24}/></span>
                <h3 className="font-display text-lg text-wine-700 mt-4">{v.title}</h3>
                <p className="text-sm text-cocoa-500 mt-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- CONTACT ---------------- */
function ContactPage(){
  const copy = (t)=>{ navigator.clipboard && navigator.clipboard.writeText(t); };
  const toast = useApp().showToast;
  return (
    <main>
      <PageHero kicker="We would love to hear from you" title="Contact Jamcy’s Bakery"
        sub="Orders, questions, event planning — reach us however suits you best."/>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-4 gap-4 min-[480px]:gap-5">
          {[
            {icon:'phone', t:'Call the Bakery', lines:[BUSINESS.phone], href:`tel:${BUSINESS.phone}`, cta:'Call Now'},
            {icon:'whatsapp', t:'WhatsApp / Orders', lines:[BUSINESS.whatsapp], href:waLink("Hello Jamcy’s Bakery!"), cta:'Chat on WhatsApp', green:true},
            {icon:'pin', t:'Visit Us', lines:[BUSINESS.address], href:'https://www.google.com/maps/search/?api=1&query=60%20Housing%20Estate', cta:'Get Directions'},
            {icon:'card', t:'Bank Transfer', lines:[`Acct Name: ${BUSINESS.accountName}`,`Acct No: ${BUSINESS.accountNumber}`]},
          ].map((c,i)=>(
            <div key={c.t} className={`bg-white rounded-[1.6rem] border border-gold-200/70 shadow-card p-6 min-[400px]:p-7 text-center reveal d${i} hover:-translate-y-1 hover:shadow-soft transition-all duration-300 ${c.green?'ring-1 ring-leaf-500/40':''}`}>
              <span className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${c.green?'bg-leaf-50 text-leaf-600':'bg-wine-50 text-wine-700'}`}><Icon name={c.icon} size={24}/></span>
              <h2 className="font-display text-lg text-wine-700 mt-4">{c.t}</h2>
              {c.lines.map(l=>(
                <div key={l} className="mt-1.5 flex items-center justify-center gap-1.5 text-cocoa-600 text-[15px] break-words px-2">
                  {l.includes(BUSINESS.accountNumber) && <button onClick={()=>{copy(BUSINESS.accountNumber); toast('Account number copied');}} className="text-gold-600 hover:text-wine-700 shrink-0" aria-label="Copy account number"><Icon name="copy" size={14}/></button>}
                  <span className="font-medium">{l}</span>
                </div>
              ))}
              {c.href && <a href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noopener" className="btn btn-outline !py-2 !px-5 text-xs mt-4">{c.cta}</a>}
            </div>
          ))}
        </div>
        <div className="mt-9 bg-wine-700 rounded-[1.8rem] p-6 min-[400px]:p-8 md:p-12 text-center relative overflow-hidden reveal">
          <BotanicalSpray className="absolute -right-8 -top-10 w-44 opacity-25" flip/>
          <BotanicalSpray className="absolute -left-8 -bottom-10 w-44 opacity-25"/>
          <h2 className="h3 font-display text-ivory font-semibold relative">Ready to order?</h2>
          <p className="text-cream/90 mt-2 relative">Send your order on WhatsApp {BUSINESS.whatsapp} — delivery and pickup available.</p>
          <div className="mt-6 flex flex-col min-[420px]:flex-row flex-wrap justify-center gap-3 relative">
            <a href={waLink("Hello Jamcy’s Bakery, I would like to place an order.")} target="_blank" rel="noopener" className="btn btn-wa w-full min-[420px]:w-auto"><Icon name="whatsapp" size={17}/> WhatsApp Us</a>
            <a href={`tel:${BUSINESS.phone}`} className="btn btn-light w-full min-[420px]:w-auto"><Icon name="phone" size={16}/> Call Bakery</a>
            <a href="#/shop" className="btn btn-gold w-full min-[420px]:w-auto"><Icon name="bag" size={16}/> Order Now</a>
            <a href="https://www.google.com/maps/search/?api=1&query=60%20Housing%20Estate" target="_blank" rel="noopener" className="btn btn-outline !border-ivory/70 !text-ivory !bg-transparent hover:!bg-ivory hover:!text-wine-700 w-full min-[420px]:w-auto"><Icon name="pin" size={16}/> Get Directions</a>
          </div>
          <div className="mt-8 flex justify-center gap-3 relative">
            <a href={waLink("Hello Jamcy’s Bakery!")} target="_blank" rel="noopener" aria-label="WhatsApp" className="icon-btn p-3 rounded-full bg-white/15 text-ivory hover:bg-white/25"><Icon name="whatsapp" size={20}/></a>
            <span title="Instagram coming soon" aria-label="Instagram (coming soon)" className="icon-btn p-3 rounded-full bg-white/10 text-ivory/50 cursor-default"><Icon name="instagram" size={20}/></span>
            <span title="Facebook coming soon" aria-label="Facebook (coming soon)" className="icon-btn p-3 rounded-full bg-white/10 text-ivory/50 cursor-default"><Icon name="facebook" size={20}/></span>
          </div>
          <p className="text-cream/60 text-xs mt-3 relative">Instagram &amp; Facebook handles coming soon — WhatsApp is the fastest way to reach us.</p>
        </div>
      </section>
    </main>
  );
}

/* ---------------- CART ---------------- */
function CartLines({lines}){
  const { updateQty, removeLine } = useApp();
  return (
    <ul className="divide-y divide-gold-200/70">
      {lines.map((l)=>(
        <li key={l.key} className="flex gap-3 min-[400px]:gap-4 py-4 min-[400px]:py-5">
          <a href={`#/product/${l.id}`} className="shrink-0 w-[68px] h-[68px] min-[400px]:w-20 min-[400px]:h-20 block">
            <SafeImage src={l.product.image} alt={l.product.name} fb={FB(l.product.category)} label={l.product.name} className="w-full h-full rounded-xl min-[400px]:rounded-2xl object-cover"/>
          </a>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <a href={`#/product/${l.id}`} className="font-display text-[15px] min-[400px]:text-[16px] text-cocoa-700 hover:text-wine-700 leading-snug">{l.product.name}</a>
                {Object.entries(l.options||{}).filter(([k,v])=>v&&k!=='Date needed').length>0 && (
                  <p className="text-[11px] min-[400px]:text-xs text-cocoa-400 mt-1 break-words">{Object.entries(l.options).filter(([k,v])=>v&&k!=='Date needed').map(([k,v])=>`${k}: ${v}`).join(' • ')}</p>
                )}
              </div>
              <button onClick={()=>removeLine(l.key)} aria-label={`Remove ${l.product.name} from cart`} className="icon-btn p-1.5 text-cocoa-400 hover:text-wine-600 shrink-0"><Icon name="close" size={15}/></button>
            </div>
            <div className="flex items-center justify-between gap-2 mt-2.5 flex-wrap">
              <Qty q={l.qty} set={(n)=>updateQty(l.key, n)}/>
              <span className="font-semibold text-wine-700 text-[14px] min-[400px]:text-[15px]">{fmt(l.product.price*l.qty)}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
function CartDrawer(){
  const { cartOpen, closeCart, cartLines, subtotal } = useApp();
  useEffect(() => {
    document.body.classList.toggle('no-scroll', cartOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [cartOpen]);
  useEffect(() => { const on=(e)=>{ if(e.key==='Escape') closeCart(); }; window.addEventListener('keydown',on); return ()=>window.removeEventListener('keydown',on); }, [closeCart]);
  return (
    <div className={`fixed inset-0 z-50 ${cartOpen?'':'pointer-events-none'}`} aria-hidden={!cartOpen}>
      <div className={`absolute inset-0 bg-wine-900/55 backdrop-blur-sm transition-opacity duration-300 ${cartOpen?'opacity-100':'opacity-0'}`} onClick={closeCart}/>
      <aside role="dialog" aria-label="Shopping basket" className={`absolute inset-y-0 right-0 w-full max-w-md bg-ivory shadow-lift flex flex-col transition-transform duration-300 ${cartOpen?'translate-x-0':'translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 min-[400px]:px-6 h-[66px] min-[400px]:h-[72px] border-b border-gold-200/70">
          <h2 className="font-display text-lg min-[400px]:text-xl text-wine-700 flex items-center gap-2.5"><Icon name="bag" size={20}/> Your Basket {cartLines.length>0 && <span className="text-sm font-sans font-semibold text-gold-600">({cartLines.reduce((s,l)=>s+l.qty,0)})</span>}</h2>
          <button onClick={closeCart} aria-label="Close cart" className="icon-btn p-2.5 text-wine-700 hover:bg-wine-50"><Icon name="close"/></button>
        </div>
        {cartLines.length===0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <span className="w-20 h-20 rounded-full bg-blush-100 text-wine-500 flex items-center justify-center"><Icon name="bag" size={34}/></span>
            <p className="font-display text-2xl text-wine-700 mt-6">Your basket is empty</p>
            <p className="text-cocoa-500 text-sm mt-2">Cookies are waiting. Cakes are waiting. Your basket is not.</p>
            <a href="#/shop" onClick={closeCart} className="btn btn-primary mt-7">Browse the Shop</a>
          </div>
        ) : (
          <React.Fragment>
            <div className="flex-1 overflow-y-auto px-4 min-[400px]:px-6"><CartLines lines={cartLines}/></div>
            <div className="border-t border-gold-200/70 px-4 min-[400px]:px-6 py-5 bg-cream">
              <div className="flex justify-between text-[15px]"><span className="text-cocoa-500">Subtotal</span><span className="font-semibold text-wine-700">{fmt(subtotal)}</span></div>
              <p className="text-xs text-cocoa-400 mt-1">Delivery fee confirmed at checkout.</p>
              <div className="grid grid-cols-2 gap-2.5 min-[400px]:gap-3 mt-4">
                <a href="#/cart" onClick={closeCart} className="btn btn-outline !py-3 text-sm">View Cart</a>
                <a href="#/checkout" onClick={closeCart} className="btn btn-primary !py-3 text-sm">Checkout</a>
              </div>
              <a href={waLink(cartWAMessage(cartLines, subtotal))} target="_blank" rel="noopener" className="btn btn-wa w-full mt-2.5 !py-3 text-sm"><Icon name="whatsapp" size={16}/> Order This on WhatsApp</a>
              <button onClick={closeCart} className="w-full text-center text-sm text-cocoa-500 hover:text-wine-700 mt-2.5 py-1">Continue shopping</button>
            </div>
          </React.Fragment>
        )}
      </aside>
    </div>
  );
}
function CartPage(){
  const { cartLines, subtotal, clearCart } = useApp();
  return (
    <main>
      <PageHero kicker="Almost yours" title="Your Basket"/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {cartLines.length===0 ? (
          <div className="text-center py-16">
            <span className="inline-flex w-20 h-20 rounded-full bg-blush-100 text-wine-500 items-center justify-center"><Icon name="bag" size={34}/></span>
            <p className="font-display text-2xl text-wine-700 mt-6">Your basket is empty</p>
            <p className="text-cocoa-500 mt-2">Add some treats and they will appear here.</p>
            <a href="#/shop" className="btn btn-primary mt-7">Start Shopping</a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
            <div className="bg-white rounded-[1.6rem] border border-gold-200/70 shadow-card px-4 min-[400px]:px-6">
              <CartLines lines={cartLines}/>
              <div className="flex flex-wrap gap-3 py-5 border-t border-gold-200/70">
                <a href="#/shop" className="btn btn-outline !py-2.5 text-sm">Continue Shopping</a>
                <button onClick={clearCart} className="btn !py-2.5 !px-5 text-sm text-cocoa-400 hover:text-wine-600">Clear basket</button>
              </div>
            </div>
            <div className="bg-cream rounded-[1.6rem] border border-gold-200/70 shadow-card p-5 min-[400px]:p-7 h-fit lg:sticky lg:top-24">
              <h2 className="font-display text-xl text-wine-700">Order Summary</h2>
              <div className="flex justify-between mt-5 text-[15px]"><span className="text-cocoa-500">Subtotal</span><span className="font-semibold text-wine-700">{fmt(subtotal)}</span></div>
              <div className="flex justify-between mt-2 text-[15px]"><span className="text-cocoa-500">Delivery</span><span className="text-cocoa-400">Confirmed at checkout</span></div>
              <div className="border-t border-gold-300/60 mt-4 pt-4 flex justify-between">
                <span className="font-display text-lg text-wine-700">Total</span><span className="font-display text-lg font-semibold text-wine-700">{fmt(subtotal)}</span>
              </div>
              <a href="#/checkout" className="btn btn-primary w-full mt-5">Proceed to Checkout <Icon name="arrowRight" size={16}/></a>
              <a href={waLink(cartWAMessage(cartLines, subtotal))} target="_blank" rel="noopener" className="btn btn-wa w-full mt-2.5"><Icon name="whatsapp" size={16}/> Order on WhatsApp</a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

/* ---------------- CHECKOUT ---------------- */
function CheckoutPage(){
  const { cartLines, subtotal, clearCart, showToast } = useApp();
  const [fulfil, setFulfil] = useState('Delivery');
  const [payment, setPayment] = useState('Bank Transfer');
  const [form, setForm] = useState({name:'',phone:'',email:'',address:'',landmark:'',notes:'',payRef:''});
  const [errs, setErrs] = useState({});
  const set = (k,v)=>setForm((f)=>({...f,[k]:v}));
  if (cartLines.length===0) return (
    <main><div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <span className="inline-flex w-20 h-20 rounded-full bg-blush-100 text-wine-500 items-center justify-center"><Icon name="bag" size={34}/></span>
      <h1 className="h3 font-display text-wine-700 mt-6">Nothing to check out yet</h1>
      <p className="text-cocoa-500 mt-3">Add some delicious things to your basket first.</p>
      <a href="#/shop" className="btn btn-primary mt-7">Browse the Shop</a>
    </div></main>
  );
  const fee = fulfil==='Delivery' ? BUSINESS.deliveryFee : null;
  const total = subtotal + (typeof fee==='number' ? fee : 0);
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim() || form.name.trim().length<2) er.name = 'Please enter your full name.';
    if (!/^[+\d][\d\s\-()]{6,}$/.test(form.phone.trim())) er.phone = 'Please enter a valid phone number.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Please enter a valid email address.';
    if (fulfil==='Delivery' && !form.address.trim()) er.address = 'Please enter your delivery address.';
    setErrs(er);
    if (Object.keys(er).length){ showToast('Please check the highlighted fields'); return; }
    const ref = 'JB-' + Math.random().toString(36).slice(2,7).toUpperCase() + Date.now().toString(36).slice(-3).toUpperCase();
    const order = {
      ref, date: new Date().toLocaleString('en-NG',{dateStyle:'medium',timeStyle:'short'}),
      items: cartLines.map((l)=>({name:l.product.name, qty:l.qty, price:l.product.price, options:l.options})),
      subtotal, fee, total: total, fulfilment: fulfil, payment,
      customer:{name:form.name.trim(), phone:form.phone.trim(), email:form.email.trim(), address:form.address.trim(), landmark:form.landmark.trim(), notes:form.notes.trim()},
      payRef: form.payRef.trim(),
    };
    save('jamcy_last_order', order);
    clearCart();
    location.hash = '#/confirmation';
  };
  const fulfilCards = [
    {key:'Delivery', icon:'truck', t:'Delivery', d:'We bring your order to your door.'},
    {key:'Pickup', icon:'store', t:'Pickup', d:`Pickup from Jamcy’s Bakery — ${BUSINESS.address}.`},
  ];
  return (
    <main>
      <PageHero kicker="Final step" title="Checkout"/>
      <form onSubmit={submit} noValidate className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-10 items-start">
        <div className="space-y-6 min-[400px]:space-y-7">
          <fieldset className="bg-white rounded-[1.6rem] border border-gold-200/70 shadow-card p-4 min-[400px]:p-6 md:p-8">
            <legend className="sr-only">Contact details</legend>
            <h2 className="font-display text-lg min-[400px]:text-xl text-wine-700 flex items-center gap-2.5"><Icon name="user" size={19} className="text-gold-600"/> Contact Details</h2>
            <div className="grid sm:grid-cols-2 gap-4 min-[400px]:gap-5 mt-5">
              <div><label className="lbl" htmlFor="co-name">Full Name *</label>
                <input id="co-name" className={`field ${errs.name?'err':''}`} value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your name"/>
                {errs.name && <p className="text-xs text-blush-500 mt-1.5">{errs.name}</p>}</div>
              <div><label className="lbl" htmlFor="co-phone">Phone Number *</label>
                <input id="co-phone" type="tel" className={`field ${errs.phone?'err':''}`} value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="e.g. 0812 345 6789"/>
                {errs.phone && <p className="text-xs text-blush-500 mt-1.5">{errs.phone}</p>}</div>
              <div className="sm:col-span-2"><label className="lbl" htmlFor="co-email">Email (optional)</label>
                <input id="co-email" type="email" className={`field ${errs.email?'err':''}`} value={form.email} onChange={e=>set('email',e.target.value)} placeholder="you@example.com"/>
                {errs.email && <p className="text-xs text-blush-500 mt-1.5">{errs.email}</p>}</div>
            </div>
          </fieldset>
          <fieldset className="bg-white rounded-[1.6rem] border border-gold-200/70 shadow-card p-4 min-[400px]:p-6 md:p-8">
            <legend className="sr-only">Delivery or pickup</legend>
            <h2 className="font-display text-lg min-[400px]:text-xl text-wine-700 flex items-center gap-2.5"><Icon name="truck" size={19} className="text-gold-600"/> Delivery or Pickup</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 min-[400px]:gap-4 mt-5">
              {fulfilCards.map(f=>(
                <button type="button" key={f.key} onClick={()=>setFulfil(f.key)} aria-pressed={fulfil===f.key}
                  className={`text-left rounded-[1.3rem] border-2 p-4 min-[400px]:p-5 transition ${fulfil===f.key?'border-wine-600 bg-wine-50/70 shadow-soft':'border-gold-300/60 hover:border-wine-600/50'}`}>
                  <span className="flex items-center gap-3">
                    <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${fulfil===f.key?'bg-wine-600 text-ivory':'bg-wine-50 text-wine-700'}`}><Icon name={f.icon} size={20}/></span>
                    <span className="min-w-0"><span className="block font-display text-[16px] min-[400px]:text-[17px] text-wine-700">{f.t}</span><span className="block text-xs text-cocoa-500 mt-0.5">{f.d}</span></span>
                    {fulfil===f.key && <Icon name="check" size={18} className="ml-auto text-wine-600 shrink-0"/>}
                  </span>
                </button>
              ))}
            </div>
            {fulfil==='Delivery' ? (
              <div className="grid sm:grid-cols-2 gap-4 min-[400px]:gap-5 mt-5">
                <div className="sm:col-span-2"><label className="lbl" htmlFor="co-addr">Delivery Address *</label>
                  <input id="co-addr" className={`field ${errs.address?'err':''}`} value={form.address} onChange={e=>set('address',e.target.value)} placeholder="House number, street, area"/>
                  {errs.address && <p className="text-xs text-blush-500 mt-1.5">{errs.address}</p>}</div>
                <div><label className="lbl" htmlFor="co-landmark">Landmark (optional)</label>
                  <input id="co-landmark" className="field" value={form.landmark} onChange={e=>set('landmark',e.target.value)} placeholder="e.g. opposite the big church"/></div>
                <div><label className="lbl" htmlFor="co-instr">Delivery Instructions (optional)</label>
                  <input id="co-instr" className="field" value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="e.g. call when you arrive"/></div>
              </div>
            ) : (
              <div className="mt-5 rounded-[1.2rem] bg-leaf-50 border border-leaf-500/30 p-4 min-[400px]:p-5 flex gap-3.5">
                <Icon name="store" size={22} className="text-leaf-600 shrink-0 mt-0.5"/>
                <div>
                  <p className="font-semibold text-leaf-700">Pickup from Jamcy’s Bakery</p>
                  <p className="text-sm text-cocoa-600 mt-1">{BUSINESS.address} — we will message you on <strong>{form.phone || 'your number'}</strong> as soon as your order is ready.</p>
                </div>
              </div>
            )}
          </fieldset>
          <fieldset className="bg-white rounded-[1.6rem] border border-gold-200/70 shadow-card p-4 min-[400px]:p-6 md:p-8">
            <legend className="sr-only">Payment method</legend>
            <h2 className="font-display text-lg min-[400px]:text-xl text-wine-700 flex items-center gap-2.5"><Icon name="card" size={19} className="text-gold-600"/> Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 min-[400px]:gap-4 mt-5">
              <button type="button" onClick={()=>setPayment('Bank Transfer')} aria-pressed={payment==='Bank Transfer'}
                className={`text-left rounded-[1.3rem] border-2 p-4 min-[400px]:p-5 transition ${payment==='Bank Transfer'?'border-wine-600 bg-wine-50/70':'border-gold-300/60 hover:border-wine-600/50'}`}>
                <span className="flex items-center gap-3 font-semibold text-wine-700"><Icon name="card" size={19}/> Bank Transfer</span>
                <span className="block text-xs text-cocoa-500 mt-1.5">Transfer, then share the reference.</span>
              </button>
              {BUSINESS.payOnFulfillment && (
                <button type="button" onClick={()=>setPayment('Pay on Pickup/Delivery')} aria-pressed={payment!=='Bank Transfer'}
                  className={`text-left rounded-[1.3rem] border-2 p-4 min-[400px]:p-5 transition ${payment!=='Bank Transfer'?'border-wine-600 bg-wine-50/70':'border-gold-300/60 hover:border-wine-600/50'}`}>
                  <span className="flex items-center gap-3 font-semibold text-wine-700"><Icon name="check" size={19}/> Pay on {fulfil}</span>
                  <span className="block text-xs text-cocoa-500 mt-1.5">Pay when you receive your order.</span>
                </button>
              )}
            </div>
            {payment==='Bank Transfer' && (
              <div className="mt-5 rounded-[1.2rem] bg-cream border border-gold-300/60 p-4 min-[400px]:p-5">
                <p className="text-sm text-cocoa-600">Kindly transfer the total to:</p>
                <div className="mt-3 space-y-2 font-display">
                  <p className="text-wine-700 flex items-center justify-between gap-3 flex-wrap"><span>Account Name:</span><strong>{BUSINESS.accountName}</strong></p>
                  <p className="text-wine-700 flex items-center justify-between gap-3 flex-wrap"><span>Account Number:</span>
                    <strong className="flex items-center gap-2">{BUSINESS.accountNumber}
                      <button type="button" onClick={()=>{navigator.clipboard && navigator.clipboard.writeText(BUSINESS.accountNumber); showToast('Account number copied');}} className="text-gold-600 hover:text-wine-700" aria-label="Copy account number"><Icon name="copy" size={15}/></button>
                    </strong></p>
                </div>
                <div className="mt-4"><label className="lbl" htmlFor="co-ref">Payment Reference (optional)</label>
                  <input id="co-ref" className="field" value={form.payRef} onChange={e=>set('payRef',e.target.value)} placeholder="Transfer reference / sender name"/></div>
              </div>
            )}
          </fieldset>
        </div>
        <div className="bg-cream rounded-[1.6rem] border border-gold-200/70 shadow-card p-5 min-[400px]:p-7 lg:sticky lg:top-24">
          <h2 className="font-display text-xl text-wine-700">Order Summary</h2>
          <ul className="mt-5 space-y-3">
            {cartLines.map((l)=>(
              <li key={l.key} className="flex justify-between gap-3 text-sm">
                <span className="text-cocoa-600 min-w-0">{l.product.name} <span className="text-cocoa-400 whitespace-nowrap">× {l.qty}</span></span>
                <span className="font-semibold text-wine-700 whitespace-nowrap">{fmt(l.product.price*l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gold-300/60 mt-5 pt-4 space-y-2 text-[15px]">
            <div className="flex justify-between"><span className="text-cocoa-500">Subtotal</span><span className="font-semibold text-wine-700">{fmt(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-cocoa-500">{fulfil==='Delivery'?'Delivery fee':'Pickup'}</span>
              <span className="font-medium text-cocoa-600">{fulfil==='Pickup' ? 'No fee' : (typeof fee==='number'?fmt(fee):'To be confirmed')}</span></div>
            <div className="flex justify-between border-t border-gold-300/60 pt-3">
              <span className="font-display text-lg text-wine-700">Total</span>
              <span className="font-display text-lg font-bold text-wine-700">{fmt(total)}{fee==null&&fulfil==='Delivery'?<span className="block text-[11px] font-sans font-normal text-cocoa-400 text-right">+ delivery fee</span>:null}</span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full mt-6 !py-4">Place My Order <Icon name="arrowRight" size={17}/></button>
          <p className="text-xs text-cocoa-400 text-center mt-3">You will receive an order reference with payment instructions, and can send the full order to us on WhatsApp.</p>
        </div>
      </form>
    </main>
  );
}

/* ---------------- CONFIRMATION ---------------- */
function ConfirmationPage(){
  const [order] = useState(()=>load('jamcy_last_order', null));
  const { showToast } = useApp();
  if (!order) return (
    <main><div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="h3 font-display text-wine-700">No recent order found</h1>
      <p className="text-cocoa-500 mt-3">Place an order and your confirmation will appear here.</p>
      <a href="#/shop" className="btn btn-primary mt-7">Browse the Shop</a>
    </div></main>
  );
  const copy = (t, m)=>{ navigator.clipboard && navigator.clipboard.writeText(t); showToast(m); };
  return (
    <main className="bg-gradient-to-b from-blush-50/80 to-cream min-h-[70vh]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 min-[400px]:py-14">
        <div className="text-center reveal revealed">
          <span className="inline-flex w-20 h-20 rounded-full bg-leaf-500 text-white items-center justify-center shadow-soft"><Icon name="check" size={38} strokeWidth={2.4}/></span>
          <p className="font-script text-[clamp(1.8rem,6.5vw,2.5rem)] text-gold-500 mt-5">Sweetness is on its way</p>
          <h1 className="h2 font-display font-bold text-wine-700 mt-1">Thank You For Your Order!</h1>
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 bg-white border border-gold-300/70 rounded-full px-5 py-2.5 shadow-card max-w-full">
            <span className="text-sm text-cocoa-500">Order number</span>
            <strong className="font-display text-wine-700 tracking-wide break-all">{order.ref}</strong>
            <button onClick={()=>copy(order.ref,'Order number copied')} aria-label="Copy order number" className="text-gold-600 hover:text-wine-700"><Icon name="copy" size={15}/></button>
          </div>
        </div>
        <div className="bg-white rounded-[1.7rem] border border-gold-200/70 shadow-card p-5 min-[400px]:p-7 mt-8 min-[400px]:mt-9">
          <h2 className="font-display text-xl text-wine-700">Order Summary</h2>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {order.items.map((l,i)=>(
              <li key={i} className="flex justify-between gap-3"><span className="text-cocoa-600 min-w-0">{l.name} <span className="text-cocoa-400 whitespace-nowrap">× {l.qty}</span></span><span className="font-semibold text-wine-700 whitespace-nowrap">{fmt(l.price*l.qty)}</span></li>
            ))}
          </ul>
          <div className="border-t border-gold-300/60 mt-5 pt-4 space-y-2 text-[15px]">
            <div className="flex justify-between"><span className="text-cocoa-500">Subtotal</span><span className="font-semibold">{fmt(order.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-cocoa-500">{order.fulfilment==='Delivery'?'Delivery fee':'Pickup'}</span><span>{order.fulfilment==='Pickup'?'No fee':(typeof order.fee==='number'?fmt(order.fee):'To be confirmed')}</span></div>
            <div className="flex justify-between border-t border-gold-300/60 pt-3"><span className="font-display text-lg text-wine-700">Total</span><span className="font-display text-lg font-bold text-wine-700">{fmt(order.total)}</span></div>
            <div className="flex justify-between"><span className="text-cocoa-500">Fulfilment</span><span className="font-medium">{order.fulfilment}</span></div>
            <div className="flex justify-between"><span className="text-cocoa-500">Payment</span><span className="font-medium">{order.payment}</span></div>
          </div>
          {order.payment==='Bank Transfer' && (
            <div className="mt-5 rounded-[1.2rem] bg-cream border border-gold-300/60 p-4 min-[400px]:p-5 text-[15px]">
              <p className="font-semibold text-wine-700 flex items-center gap-2"><Icon name="card" size={17} className="text-gold-600"/> Payment Instructions</p>
              <p className="text-cocoa-600 mt-2">Transfer <strong>{fmt(order.total)}</strong> to:</p>
              <div className="mt-2 space-y-1 font-display text-wine-700">
                <p>Account Name: <strong>{BUSINESS.accountName}</strong></p>
                <p className="flex items-center gap-2 flex-wrap">Account Number: <strong>{BUSINESS.accountNumber}</strong>
                  <button onClick={()=>copy(BUSINESS.accountNumber,'Account number copied')} aria-label="Copy account number" className="text-gold-600 hover:text-wine-700"><Icon name="copy" size={14}/></button>
                </p>
              </div>
              <p className="text-xs text-cocoa-400 mt-3">Use your order number <strong className="text-wine-700">{order.ref}</strong> as the payment reference, then send your order on WhatsApp below so we can confirm quickly.</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-2.5 min-[400px]:gap-3 mt-7">
          <a href={waLink(orderWAMessage(order))} target="_blank" rel="noopener" className="btn btn-wa min-[420px]:col-span-3 !py-4"><Icon name="whatsapp" size={19}/> Send Order on WhatsApp</a>
          <a href={`tel:${BUSINESS.phone}`} className="btn btn-outline"><Icon name="phone" size={16}/> Call Us</a>
          <a href="#/" className="btn btn-primary min-[420px]:col-span-2">Continue Shopping</a>
        </div>
        <p className="text-center font-script text-2xl text-gold-500 mt-9">Elegant in Every Mouthful</p>
      </div>
    </main>
  );
}

/* ---------------- PRODUCT PAGE ---------------- */
function ProductPage({id}){
  const p = byId(id);
  if (!p) return (
    <main><div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="h3 font-display text-wine-700">Treat not found</h1>
      <p className="text-cocoa-500 mt-3">It may have been renamed — browse the shop instead.</p>
      <a href="#/shop" className="btn btn-primary mt-7">Go to Shop</a>
    </div></main>
  );
  const related = PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-cocoa-400 mb-6 flex flex-wrap items-center gap-1.5">
        <a href="#/" className="hover:text-wine-700">Home</a> <span className="text-gold-500">/</span>
        <a href="#/shop" className="hover:text-wine-700">Shop</a> <span className="text-gold-500">/</span>
        <span className="text-wine-700 font-medium">{p.name}</span>
      </nav>
      <div className="reveal revealed"><ProductDetailsBody p={p} key={p.id}/></div>
      {related.length>0 && (
        <section className="mt-16 min-[400px]:mt-20">
          <SectionHeading kicker="You may also love" title="Pairs Beautifully With"/>
          <div className="mt-9 min-[400px]:mt-10"><ProductGrid items={related}/></div>
        </section>
      )}
    </main>
  );
}

/* ---------------- ENQUIRY FORM ---------------- */
/**
 * @typedef {Object} Field
 * @property {string} name
 * @property {string} label
 * @property {string} [type]
 * @property {boolean} [required]
 * @property {string[]} [options]
 * @property {string} [placeholder]
 * @property {boolean} [half]
 */
function EnquiryForm({fields, submitLabel, messageTitle, intro}){
  const { showToast } = useApp();
  const [v, setV] = useState({});
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState(false);
  const [file, setFile] = useState(null);
  const set = (n, val)=>setV((p)=>({...p,[n]:val}));
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    fields.forEach((f)=>{
      const val = v[f.name];
      if (f.required && (!val || (typeof val==='object' && (!val||val.length===0)) || (typeof val==='string' && !val.trim())))
        er[f.name] = `${f.label.replace(/ \*$/,'')} is required.`;
      else if (f.type==='email' && val && !/^\S+@\S+\.\S+$/.test(val)) er[f.name] = 'Please enter a valid email address.';
      else if (f.type==='tel' && val && !/^[\d+\-\s()]{7,}$/.test(val)) er[f.name] = 'Please enter a valid phone number.';
    });
    setErrs(er);
    if (Object.keys(er).length){ showToast('Please complete the required fields'); return; }
    setDone(true);
    setTimeout(()=>document.getElementById('enquiry-done')?.scrollIntoView({behavior:'smooth',block:'center'}), 80);
  };
  const buildMessage = () => {
    let m = `Hello Jamcy’s Bakery,\n\n${messageTitle}\n`;
    fields.forEach((f)=>{
      const val = v[f.name];
      if (f.type==='file') { if (file) m += `${f.label}: ${file.name} (will be sent via WhatsApp)\n`; return; }
      if (Array.isArray(val)) { if (val.length) m += `${f.label}: ${val.join(', ')}\n`; return; }
      if (val && String(val).trim()) m += `${f.label}: ${val}\n`;
    });
    return m + '\nPlease let me know the next steps. Thank you!';
  };
  if (done) return (
    <div id="enquiry-done" className="bg-leaf-50 border border-leaf-500/40 rounded-[1.6rem] p-6 min-[400px]:p-8 md:p-10 text-center toast-in">
      <span className="inline-flex w-16 h-16 rounded-full bg-leaf-500 text-white items-center justify-center shadow-soft"><Icon name="check" size={30} strokeWidth={2.4}/></span>
      <h3 className="font-display text-xl min-[400px]:text-2xl text-wine-700 mt-5">Request received — thank you{v.name?`, ${String(v.name).split(' ')[0]}`:''}!</h3>
      <p className="text-cocoa-500 mt-3 max-w-md mx-auto">Our team will get back to you shortly. To speed things up, send your request directly on WhatsApp:</p>
      <div className="mt-6 flex flex-col min-[420px]:flex-row justify-center gap-3">
        <a href={waLink(buildMessage())} target="_blank" rel="noopener" className="btn btn-wa w-full min-[420px]:w-auto"><Icon name="whatsapp" size={17}/> Send on WhatsApp</a>
        <button onClick={()=>{setDone(false); setV({}); setFile(null);}} className="btn btn-outline w-full min-[420px]:w-auto">Make Another Request</button>
      </div>
      {file && <p className="text-xs text-cocoa-400 mt-4">Remember to attach “{file.name}” in the WhatsApp chat.</p>}
    </div>
  );
  return (
    <form onSubmit={submit} noValidate>
      {intro}
      <div className="grid sm:grid-cols-2 gap-4 min-[400px]:gap-5">
        {fields.map((f)=>{
          const err = errs[f.name];
          const wrap = (child) => (
            <div key={f.name} className={f.type==='textarea'||f.type==='checkboxgroup'||f.type==='file'?'sm:col-span-2':(f.half?'':'sm:col-span-2')}>
              {f.type!=='checkboxgroup' && <label className="lbl" htmlFor={`ef-${f.name}`}>{f.label}{f.required?' *':''}</label>}
              {child}
              {err && <p className="text-xs text-blush-500 mt-1.5">{err}</p>}
            </div>
          );
          if (f.type==='select') return wrap(
            <select id={`ef-${f.name}`} className={`field ${err?'err':''}`} value={v[f.name]||''} onChange={e=>set(f.name,e.target.value)}>
              <option value="" disabled>Select…</option>
              {f.options.map(o=><option key={o} value={o}>{o}</option>)}
            </select>);
          if (f.type==='textarea') return wrap(
            <textarea id={`ef-${f.name}`} rows={4} className={`field ${err?'err':''}`} value={v[f.name]||''} onChange={e=>set(f.name,e.target.value)} placeholder={f.placeholder}/>);
          if (f.type==='checkboxgroup') return wrap(
            <div>
              <p className="lbl">{f.label}{f.required?' *':''}</p>
              <div className="flex flex-wrap gap-2">
                {f.options.map(o=>{
                  const arr = v[f.name]||[];
                  const on = arr.includes(o);
                  return (
                    <button type="button" key={o} aria-pressed={on} onClick={()=>set(f.name, on?arr.filter(x=>x!==o):[...arr,o])}
                      className={`px-3.5 min-[400px]:px-4 py-2 rounded-full text-[13px] border transition ${on?'bg-wine-700 border-wine-700 text-ivory':'border-cocoa-500/25 text-cocoa-600 hover:border-wine-600'}`}>{o}</button>
                  );
                })}
              </div>
            </div>);
          if (f.type==='file') return wrap(
            <div>
              <label className="lbl" htmlFor={`ef-${f.name}`}>{f.label}</label>
              <input id={`ef-${f.name}`} type="file" accept="image/*" className="field !py-2.5 file:mr-3 file:mt-1 file:rounded-full file:border-0 file:bg-wine-700 file:text-ivory file:px-4 file:py-2 file:text-sm file:cursor-pointer"
                onChange={e=>{ const fl = e.target.files && e.target.files[0]; if (fl) setFile({name:fl.name, url:URL.createObjectURL(fl)}); }}/>
              {file && (
                <div className="mt-3 flex items-center gap-3">
                  <img src={file.url} alt={`Inspiration preview: ${file.name}`} className="w-16 h-16 rounded-xl object-cover border border-gold-300"/>
                  <p className="text-sm text-cocoa-500 min-w-0">Inspiration attached: <strong className="text-wine-700 break-all">{file.name}</strong>
                    <span className="block text-xs text-cocoa-400 mt-0.5">Send this image to us on WhatsApp after submitting.</span></p>
                </div>
              )}
            </div>);
          return wrap(
            <input id={`ef-${f.name}`} type={f.type||'text'} className={`field ${err?'err':''}`} value={v[f.name]||''}
              onChange={e=>set(f.name,e.target.value)} placeholder={f.placeholder}/>);
        })}
      </div>
      <button type="submit" className="btn btn-primary w-full mt-7 !py-4"><Icon name="check" size={18}/> {submitLabel}</button>
    </form>
  );
}

/* ---------------- PACKAGE ENQUIRY MODAL ---------------- */
function PackageEnquiryModal(){
  const { pkgEnquiry, setPkgEnquiry } = useApp();
  const fields = [
    {name:'name',label:'Full Name',type:'text',required:true,half:true},
    {name:'phone',label:'Phone Number',type:'tel',required:true,half:true},
    {name:'email',label:'Email',type:'email',half:true},
    {name:'date',label:'Event Date',type:'date',half:true},
    {name:'guests',label:'Number of Guests',type:'number',half:true},
    {name:'location',label:'Event Location',type:'text',half:true},
    {name:'details',label:'Additional Details',type:'textarea'},
  ];
  if (!pkgEnquiry) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Request quote — ${pkgEnquiry.name}`}>
      <div className="absolute inset-0 bg-wine-900/55 backdrop-blur-sm" onClick={()=>setPkgEnquiry(null)}/>
      <div className="relative bg-ivory w-full sm:max-w-2xl rounded-t-[1.6rem] sm:rounded-[1.8rem] shadow-lift max-h-[92vh] overflow-y-auto" style={{animation:'fadeUp .3s ease'}}>
        <div className="sticky top-0 bg-ivory/95 backdrop-blur border-b border-gold-200/70 px-4 min-[400px]:px-6 py-4 min-[400px]:py-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[.14em] uppercase text-gold-600">Request a Quote</p>
            <h2 className="font-display text-xl min-[400px]:text-2xl text-wine-700 truncate">{pkgEnquiry.name}</h2>
          </div>
          <button onClick={()=>setPkgEnquiry(null)} aria-label="Close" className="icon-btn p-2.5 text-wine-700 hover:bg-wine-50 shrink-0"><Icon name="close"/></button>
        </div>
        <div className="p-4 min-[400px]:p-6">
          <EnquiryForm fields={fields} submitLabel="Request This Package"
            messageTitle={`EVENT PACKAGE REQUEST — ${pkgEnquiry.name} (${pkgEnquiry.servings||'custom size'}) — Jamcy’s Bakery`}/>
        </div>
      </div>
    </div>
  );
}

/* ---------------- QUICK VIEW MODAL ---------------- */
function QuickViewModal(){
  const { quickView, setQuickView } = useApp();
  useEffect(() => {
    const on=(e)=>{ if(e.key==='Escape') setQuickView(null); };
    window.addEventListener('keydown',on); return ()=>window.removeEventListener('keydown',on);
  }, [setQuickView]);
  useEffect(()=>{ document.body.classList.toggle('no-scroll', !!quickView); return ()=>document.body.classList.remove('no-scroll'); },[quickView]);
  if (!quickView) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={quickView.name}>
      <div className="absolute inset-0 bg-wine-900/55 backdrop-blur-sm" onClick={()=>setQuickView(null)}/>
      <div className="relative bg-ivory w-full sm:max-w-4xl rounded-t-[1.6rem] sm:rounded-[1.8rem] shadow-lift max-h-[92vh] overflow-y-auto" style={{animation:'fadeUp .3s ease'}}>
        <button onClick={()=>setQuickView(null)} aria-label="Close quick view"
          className="sticky top-3 float-right mr-3 icon-btn p-2.5 bg-white/95 text-wine-700 shadow hover:bg-blush-50 rounded-full z-10"><Icon name="close"/></button>
        <div className="p-4 min-[400px]:p-6 md:p-9"><ProductDetailsBody p={quickView} key={quickView.id} onClose={()=>setQuickView(null)}/></div>
      </div>
    </div>
  );
}

/* ---------------- TOAST ---------------- */
function Toast(){
  const { toastMsg } = useApp();
  if (!toastMsg) return null;
  return (
    <div className="fixed bottom-24 md:bottom-8 inset-x-0 z-[60] flex justify-center px-4 pointer-events-none" role="status" aria-live="polite">
      <div className="toast-in bg-wine-800 text-ivory rounded-full pl-3.5 pr-5 py-2.5 shadow-lift flex items-center gap-2.5 text-sm font-medium max-w-full">
        <span className="w-6 h-6 rounded-full bg-gold-400 text-wine-900 flex items-center justify-center shrink-0"><Icon name="check" size={13} strokeWidth={3}/></span>
        <span className="truncate">{toastMsg}</span>
      </div>
    </div>
  );
}

/* ---------------- MOBILE BOTTOM BAR ---------------- */
function MobileBottomBar({onCart}){
  const { cartCount } = useApp();
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-ivory/95 backdrop-blur-md border-t border-gold-200/70" style={{paddingBottom:'env(safe-area-inset-bottom)'}}>
      <div className="grid grid-cols-3 gap-1 p-1.5">
        <a href="#/shop" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-wine-700 text-[10px] min-[360px]:text-[11px] font-semibold"><Icon name="store" size={20}/> Shop</a>
        <a href={waLink("Hello Jamcy’s Bakery, I would like to place an order.")} target="_blank" rel="noopener" className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-leaf-600 text-[10px] min-[360px]:text-[11px] font-semibold"><Icon name="whatsapp" size={20}/> WhatsApp</a>
        <button onClick={onCart} className="relative flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl bg-wine-700 text-ivory text-[10px] min-[360px]:text-[11px] font-semibold">
          <Icon name="bag" size={20}/>
          <span>Order Now</span>
          {cartCount>0 && <span key={cartCount} className="animate-pop absolute top-0.5 right-4 min-[360px]:right-5 min-w-[17px] h-[17px] px-1 rounded-full bg-gold-400 text-wine-900 text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer(){
  return (
    <footer className="bg-wine-800 text-cream/90 relative overflow-hidden">
      <BotanicalSpray className="absolute -left-10 -top-8 w-52 opacity-20" flip/>
      <BotanicalSpray className="absolute -right-10 bottom-24 w-56 opacity-20"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8 relative">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light/>
            <p className="font-script text-[clamp(1.6rem,6vw,2rem)] text-gold-300 mt-3">Elegant in Every Mouthful</p>
            <p className="text-sm text-cream/75 mt-3 leading-relaxed max-w-xs">Beautiful cakes, delicious cookies, irresistible snacks and memorable event treats — freshly made with love.</p>
            <div className="flex gap-2.5 mt-5">
              <a href={waLink("Hello Jamcy’s Bakery!")} target="_blank" rel="noopener" aria-label="WhatsApp" className="icon-btn p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-ivory"><Icon name="whatsapp" size={18}/></a>
              <span title="Instagram coming soon" aria-label="Instagram (coming soon)" className="icon-btn p-2.5 rounded-full bg-white/10 text-ivory/50 cursor-default"><Icon name="instagram" size={18}/></span>
              <span title="Facebook coming soon" aria-label="Facebook (coming soon)" className="icon-btn p-2.5 rounded-full bg-white/10 text-ivory/50 cursor-default"><Icon name="facebook" size={18}/></span>
            </div>
          </div>
          <nav aria-label="Quick links">
            <h3 className="font-display text-ivory text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[['Home','#/'],['Shop','#/shop'],['Cookies','#/cookies'],['Cakes','#/cakes'],['Events','#/events'],['Catering','#/catering'],['About','#/about'],['Contact','#/contact']].map(([l,h])=>(
                <li key={l}><a href={h} className="hover:text-gold-300 transition flex items-center gap-2"><span className="text-gold-400 text-[8px]">♥</span>{l}</a></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services">
            <h3 className="font-display text-ivory text-lg">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Birthday Cakes','Wedding Cakes','Sign-Out Cakes','Event Packages','Catering','Cookies','Snacks'].map(s=>(
                <li key={s}><a href="#/events" className="hover:text-gold-300 transition flex items-center gap-2"><span className="text-gold-400 text-[8px]">♥</span>{s}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="font-display text-ivory text-lg">Contact & Payment</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5"><Icon name="phone" size={16} className="text-gold-400 mt-0.5 shrink-0"/> <a href={`tel:${BUSINESS.phone}`} className="hover:text-gold-300">{BUSINESS.phone}</a></li>
              <li className="flex gap-2.5"><Icon name="whatsapp" size={16} className="text-gold-400 mt-0.5 shrink-0"/> <a href={waLink("Hello Jamcy’s Bakery!")} target="_blank" rel="noopener" className="hover:text-gold-300">WhatsApp Orders: {BUSINESS.whatsapp}</a></li>
              <li className="flex gap-2.5"><Icon name="pin" size={16} className="text-gold-400 mt-0.5 shrink-0"/> {BUSINESS.address}</li>
              <li className="flex gap-2.5"><Icon name="card" size={16} className="text-gold-400 mt-0.5 shrink-0"/>
                <span>Account Name: <strong className="text-ivory">{BUSINESS.accountName}</strong><br/>Account Number: <strong className="text-ivory">{BUSINESS.accountNumber}</strong></span></li>
            </ul>
          </div>
        </div>
        <div className="mt-11 border-t border-white/20 pt-6 text-center">
          <Divider className="!gap-4"/>
          <p className="font-script text-[clamp(1.5rem,5.5vw,2rem)] text-gold-300 mt-3">Thank you for supporting our small business!</p>
          <p className="text-xs text-cream/55 mt-3">© {new Date().getFullYear()} Jamcy’s Bakery · {BUSINESS.address} · Elegant in Every Mouthful</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
function App(){
  const route = useHashRoute();
  const [cart, setCart] = useState(()=>load('jamcy_cart_v1', []));
  const [favs, setFavs] = useState(()=>load('jamcy_favs_v1', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [pkgEnquiry, setPkgEnquiry] = useState(null);
  const [shopSearch, setShopSearch] = useState('');
  const [toastMsg, setToastMsg] = useState(null);
  const toastTimer = useRef(null);

  useEffect(()=>save('jamcy_cart_v1', cart), [cart]);
  useEffect(()=>save('jamcy_favs_v1', favs), [favs]);
  useEffect(()=>{ setCartOpen(false); setMenuOpen(false); setSearchOpen(false); setQuickView(null); setPkgEnquiry(null); window.scrollTo({top:0, behavior:'auto'}); }, [route]);
  useEffect(()=>{
    const els = document.querySelectorAll('.reveal:not(.revealed)');
    if (!('IntersectionObserver' in window)){ els.forEach(el=>el.classList.add('revealed')); return; }
    const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target);} }),{threshold:.1, rootMargin:'0px 0px -40px 0px'});
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  }, [route]);

  const showToast = (m) => { setToastMsg(m); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(()=>setToastMsg(null), 2400); };
  const closeCart = () => setCartOpen(false);
  const addToCart = (p, qty=1, options={}, silent=false) => {
    const key = p.id + '|' + JSON.stringify(options||{});
    setCart(prev => {
      const i = prev.findIndex((l)=>l.key===key);
      if (i>-1){ const c=[...prev]; c[i]={...c[i], qty:c[i].qty+qty}; return c; }
      return [...prev, {key, id:p.id, qty, options}];
    });
    if (!silent) showToast(`${p.name} added to your basket`);
  };
  const updateQty = (key, qty) => setCart(prev => qty<1 ? prev.filter(l=>l.key!==key) : prev.map(l=>l.key===key?{...l,qty}:l));
  const removeLine = (key) => { setCart(prev=>prev.filter(l=>l.key!==key)); showToast('Removed from your basket'); };
  const clearCart = () => setCart([]);
  const toggleFav = (p) => {
    setFavs(prev => prev.includes(p.id) ? (showToast('Removed from favourites'), prev.filter(f=>f!==p.id)) : (showToast(`${p.name} saved to favourites`), [...prev, p.id]));
  };
  const cartLines = useMemo(()=>cart.map(l=>({...l, product:byId(l.id)})).filter(l=>l.product && l.product.price!=null), [cart]);
  const cartCount = cartLines.reduce((s,l)=>s+l.qty,0);
  const subtotal = cartLines.reduce((s,l)=>s+(l.product.price*l.qty),0);

  const ctx = { cart, cartLines, cartCount, subtotal, addToCart, updateQty, removeLine, clearCart, closeCart, favs, toggleFav,
    cartOpen, setCartOpen, showToast, toastMsg, quickView, setQuickView, pkgEnquiry, setPkgEnquiry, shopSearch, setShopSearch };

  let page;
  if (route === '/' || route === '') page = <HomePage/>;
  else if (route.startsWith('/product/')) page = <ProductPage id={route.slice('/product/'.length)}/>;
  else if (route === '/shop') page = <ShopPage/>;
  else if (route === '/cookies') page = <CookiesPage/>;
  else if (route === '/cakes') page = <CakesPage/>;
  else if (route === '/snacks') page = <SnacksPage/>;
  else if (route === '/events') page = <EventsPage/>;
  else if (route === '/wedding-cakes') page = <WeddingPage/>;
  else if (route === '/signout-cakes') page = <SignOutPage/>;
  else if (route === '/packages') page = <PackagesPage/>;
  else if (route === '/catering') page = <CateringPage/>;
  else if (route === '/custom-cake') page = <CustomCakePage/>;
  else if (route === '/about') page = <AboutPage/>;
  else if (route === '/contact') page = <ContactPage/>;
  else if (route === '/cart') page = <CartPage/>;
  else if (route === '/checkout') page = <CheckoutPage/>;
  else if (route === '/confirmation') page = <ConfirmationPage/>;
  else page = (
    <main><div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="font-script text-[clamp(2.2rem,9vw,3.2rem)] text-gold-500">Oops!</p>
      <h1 className="h2 font-display text-wine-700 mt-2">Page not found</h1>
      <p className="text-cocoa-500 mt-3">This crumb led nowhere — head back to the bakery.</p>
      <a href="#/" className="btn btn-primary mt-7">Back to Home</a>
    </div></main>
  );

  return (
    <Ctx.Provider value={ctx}>
      <a href="#main" className="sr-only">Skip to content</a>
      <Navbar route={route} onSearch={()=>setSearchOpen(true)} onCart={()=>setCartOpen(true)} onMenu={()=>setMenuOpen(true)}/>
      <div id="main" className="pb-20 md:pb-0">{page}</div>
      <Footer/>
      <MobileBottomBar onCart={()=>setCartOpen(true)}/>
      <MobileMenu open={menuOpen} close={()=>setMenuOpen(false)} route={route}/>
      <SearchOverlay open={searchOpen} close={()=>setSearchOpen(false)}/>
      <CartDrawer/>
      <QuickViewModal/>
      <PackageEnquiryModal/>
      <Toast/>
    </Ctx.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
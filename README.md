ভাড়া ম্যানেজার — Dashboard UI (HTML + Tailwind + JavaScript)

এটি একটি ভাড়া ম্যানেজার প্রোটোটাইপ যা HTML, Tailwind CSS এবং JavaScript ব্যবহার করে তৈরি করা হয়েছে। এই প্রোজেক্টের উদ্দেশ্য হলো ভাড়াটিয়ার তথ্য, পরিবারের সদস্য, মাসিক ভাড়া হিসাব, ইতিহাস এবং ইনভয়েস সহজভাবে দেখা ও ম্যানেজ করা।

প্রোজেক্ট ফিচারসমূহ (বর্তমান)

Dashboard Layout: Sidebar + Main Content

Sidebar:

লোগো এবং প্রোজেক্ট নাম

ভাড়াটিয়ার লিস্ট (ডেমো ডেটা)

সার্চ ইনপুট

নতুন ভাড়াটিয়া যোগ করার বাটন

Main Content:

প্রোফাইল কার্ড (নাম, ফোন, ঠিকানা, মাসিক ভাড়া, স্ট্যাটাস)

সামারি কার্ড (এই মাসের প্রাপ্য / প্রদান / বাকি)

পরিবারের সদস্য কার্ড (ডেমো সদস্য)

ভাড়া হিসাবের টেবিল (মাসভিত্তিক)

ইনভয়েস PDF বাটন (প্লেসহোল্ডার)

JavaScript যুক্ত ফিচারসমূহ:

ডায়নামিক সামারি আপডেট

ভাড়া হিসাব যোগ/বিয়োগ (plus/minus বাটন)

ভাড়াটিয়ার তথ্য এডিট/ডিলিট অপশন (বেসিক)

লোকাল স্টোরেজ ডেটা সেভ

ব্যবহৃত টেকনোলজি

HTML5

Tailwind CSS (CDN)

JavaScript (Vanilla)

Responsive Layout (Mobile + Desktop)

রান করার নিয়ম

রিপোজিটরি ক্লোন করুন:

git clone <your-repo-url>


index.html ফাইলটি সরাসরি ব্রাউজারে ওপেন করুন।

Tailwind CDN ও JavaScript ব্যবহার করা হয়েছে, তাই কোনো আলাদা build প্রক্রিয়া লাগবে না।

ভবিষ্যৎ ফিচারসমূহ / রোডম্যাপ
ফিচার	স্ট্যাটাস	বিবরণ
Add/Edit Tenant	Pending	নতুন ভাড়াটিয়া যোগ করা ও তথ্য সম্পাদনা
Local Storage উন্নয়ন	Ongoing	ডেটা ব্রাউজারে সেভ ও লোড করা
Invoice PDF	Pending	ভাড়া হিসাব PDF আকারে ডাউনলোড
Family Member Management	Pending	পরিবারের সদস্যদের যোগ/এডিট/ডিলিট
Monthly Rent Auto-Update	Pending	নতুন মাসে স্বয়ংক্রিয়ভাবে ভাড়া এন্ট্রি
Payment Tracking	Pending	প্রদানকৃত ও বাকি টাকার হিসাব ট্র্যাক
Multi-Tenant Dashboard	Pending	একাধিক ভাড়াটিয়ার ডেটা একসাথে ম্যানেজ
নোট

এই প্রোজেক্টটি বর্তমানে শুধুমাত্র Frontend ভিত্তিক।

Backend বা Payment System এখনো যুক্ত করা হয়নি।

ভবিষ্যতে JavaScript এর মাধ্যমে আরও ইন্টার‌্যাকটিভ ফিচার (যেমন Local Storage, API Integration ইত্যাদি) যোগ করা হবে।

© ২০২৫ ভাড়া ম্যানেজার — Dashboard UI Prototype

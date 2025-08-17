# Rental-Manager # ভাড়া ম্যানেজার — Dashboard UI (HTML + Tailwind)

এটি একটি **ভাড়া ম্যানেজার প্রোটোটাইপ** যা HTML এবং Tailwind CSS ব্যবহার করে বানানো হয়েছে। প্রোজেক্টের উদ্দেশ্য হলো ভাড়াটিয়ার তথ্য, পরিবারের সদস্য, মাসিক ভাড়া হিসাব এবং ইনভয়েস ডাউনলোড সহজভাবে দেখানো।

---

## Project Features (বর্তমান)

- **Dashboard Layout**: Sidebar + Main content
- **Sidebar**:
  - লোগো এবং প্রোজেক্ট নাম
  - ভাড়াটিয়ার লিস্ট (ডেমো)
  - Search Input
  - Add Tenant Button
- **Main Content**:
  - Profile Card (নাম, ফোন, ঠিকানা, মাসিক ভাড়া, স্ট্যাটাস)
  - Summary Card (এই মাসের প্রাপ্য/প্রদান/বাকি)
  - Family Members Card (ডেমো সদস্য)
  - Rent History Table (মাসভিত্তিক হিসাব)
  - Invoice PDF বাটন (প্লেসহোল্ডার)

---

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Responsive Layout (Mobile + Desktop)

---

## How to Run

1. এই রিপোজিটরি ক্লোন করুন:
```bash
git clone <your-repo-url>
```
2. `index.html` ফাইলটি ব্রাউজারে খুলুন।
3. Tailwind CDN ব্যবহার করা হয়েছে, কোনো আলাদা বিল্ড প্রক্রিয়া লাগবে না।

---

## Future Features / Roadmap

| Feature | Status | Description |
|---------|--------|-------------|
| Add/Edit Tenant | Pending | নতুন ভাড়াটিয়া যোগ করা এবং সম্পাদনা করা |
| Local Storage | Pending | ভাড়াটিয়ার ডেটা লোকাল ব্রাউজারে সেভ করা |
| Invoice PDF | Pending | ভাড়া হিসাব PDF আকারে ডাউনলোড করা |
| Family Member Management | Pending | পরিবারের সদস্যদের যোগ/এডিট/ডিলিট করা |
| Monthly Rent Auto-Update | Pending | নতুন মাসে স্বয়ংক্রিয়ভাবে ভাড়া এন্ট্রি তৈরি |
| Payment Tracking | Pending | দেওয়া ভাড়া এবং বাকি হিসাব ট্র্যাক করা |
| Multi-Tenant Dashboard | Pending | একাধিক ভাড়াটিয়ার তথ্য একসাথে দেখা |

---

## Notes

- এই প্রোটোটাইপ শুধুমাত্র **Frontend Layout**; কোনো Backend বা Payment System নেই।
- Tailwind CDN ব্যবহার করা হয়েছে, তাই কোনো build tools প্রয়োজন নেই।
- ভবিষ্যতে এই প্রোজেক্টে JS বা LocalStorage ফিচার যুক্ত করা হবে।

---

© ২০২৫ ভাড়া ম্যানেজার — Dashboard UI Prototype

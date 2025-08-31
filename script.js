  // Sample tenant data (simulating a database)
    const tenants = [
      { id: 1, name: 'রাশেদুল করিম', address: 'ধানমন্ডি', rent: 12000, phone: '01712-000000', startDate: 'জানুয়ারি ২০১৯', status: 'Active', family: [
        { name: 'সাবরিনা করিম', relation: 'স্ত্রী', age: 30 },
        { name: 'আরিয়ান করিম', relation: 'ছেলে', age: 6 },
        { name: 'আরিবা করিম', relation: 'মেয়ে', age: 3 }
      ], payments: [
        { month: 'জানুয়ারি', year: 2025, receivable: 12000, paid: 12000, status: 'Complete' },
        { month: 'ফেব্রুয়ারি', year: 2025, receivable: 12000, paid: 8000, status: 'Partial' },
        { month: 'মার্চ', year: 2025, receivable: 12000, paid: 0, status: 'Due' }
      ]},
      { id: 2, name: 'মারুফা আক্তার', address: 'মিরপুর', rent: 9500, status: 'Due', family: [], payments: [] },
      { id: 3, name: 'নুসরাত জাহান', address: 'উত্তরা', rent: 15000, status: 'Active', family: [], payments: [] },
      { id: 4, name: 'শামীম হোসেন', address: 'চকবাজার', rent: 10000, status: 'Due', family: [], payments: [] },
      { id: 5, name: 'সাবিহা ইসলাম', address: 'আগ্রাবাদ', rent: 8000, status: 'Active', family: [], payments: [] },
      { id: 6, name: 'তন্ময় কান্তি', address: 'জিন্দাবাজার', rent: 11500, status: 'Active', family: [], payments: [] },
      { id: 7, name: 'রুবেল আহমেদ', address: 'খিলগাঁও', rent: 13000, status: 'Due', family: [], payments: [] }
    ];

    const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

    let currentYear = 2025;
    let selectedTenantId = 1;
    let selectedMonth = 'আগস্ট'; // Default to current month (August 2025)

    // Mobile Sidebar Toggle
    document.getElementById('toggleSidebar').addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('hidden');
    });

    // Search Tenants
    document.getElementById('tenantSearch').addEventListener('input', (e) => {
      const searchTerm = e.target.value.trim().toLowerCase();
      document.querySelectorAll('#tenantList a.group').forEach((item) => {
        const tenantName = item.querySelector('.font-semibold').textContent.toLowerCase();
        const address = item.querySelector('.text-xs').textContent.toLowerCase();
        item.style.display = tenantName.includes(searchTerm) || address.includes(searchTerm) ? 'flex' : 'none';
      });
    });

    // Select Tenant
    document.querySelectorAll('#tenantList a.group').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        selectedTenantId = parseInt(item.dataset.tenantId);
        updateProfileCard();
        updateFamilyCard();
        updateRentHistoryTable(currentYear);
        updateSummaryCard();
      });
    });

    // Add Tenant Modal
    document.getElementById('addTenantBtn').addEventListener('click', () => {
      document.getElementById('addTenantModal').style.display = 'flex';
    });

    document.getElementById('addTenantForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newTenant = {
        id: tenants.length + 1,
        name: formData.get('name'),
        address: formData.get('address'),
        rent: parseInt(formData.get('rent')),
        status: 'Active',
        phone: '',
        startDate: new Date().toLocaleString('bn', { month: 'long', year: 'numeric' }),
        family: [],
        payments: []
      };
      tenants.push(newTenant);
      const tenantList = document.getElementById('tenantList');
      tenantList.innerHTML += `
        <a class="group flex items-center justify-between rounded-xl px-2 py-2 hover:bg-white/10" data-tenant-id="${newTenant.id}">
          <div>
            <div class="text-sm font-semibold">${newTenant.name}</div>
            <div class="text-xs text-white/70">৳${newTenant.rent.toLocaleString('bn')} • ${newTenant.address}</div>
          </div>
          <span class="rounded-md bg-green-500/20 px-2 text-[10px] font-semibold text-green-200">${newTenant.status}</span>
        </a>
      `;
      document.getElementById('addTenantModal').style.display = 'none';
      e.target.reset();
    });

    // Edit Profile Modal
    document.getElementById('editProfileBtn').addEventListener('click', () => {
      const tenant = tenants.find(t => t.id === selectedTenantId);
      const form = document.getElementById('editProfileForm');
      form.name.value = tenant.name;
      form.phone.value = tenant.phone || '';
      form.address.value = tenant.address;
      form.rent.value = tenant.rent;
      form.startDate.value = tenant.startDate;
      document.getElementById('editProfileModal').style.display = 'flex';
    });

    document.getElementById('editProfileForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const tenant = tenants.find(t => t.id === selectedTenantId);
      tenant.name = formData.get('name');
      tenant.phone = formData.get('phone');
      tenant.address = formData.get('address');
      tenant.rent = parseInt(formData.get('rent'));
      tenant.startDate = formData.get('startDate');
      updateProfileCard();
      updateTenantList();
      document.getElementById('editProfileModal').style.display = 'none';
      e.target.reset();
    });

    // Add Family Member Modal
    document.getElementById('addFamilyBtn').addEventListener('click', () => {
      document.getElementById('addFamilyModal').style.display = 'flex';
    });

    document.getElementById('addFamilyForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const tenant = tenants.find(t => t.id === selectedTenantId);
      tenant.family.push({
        name: formData.get('name'),
        relation: formData.get('relation'),
        age: parseInt(formData.get('age'))
      });
      updateFamilyCard();
      document.getElementById('addFamilyModal').style.display = 'none';
      e.target.reset();
    });

    // Clear Selected Month Payment
    document.getElementById('clearMonthBtn').addEventListener('click', () => {
      const tenant = tenants.find(t => t.id === selectedTenantId);
      let payment = tenant.payments.find(p => p.month === selectedMonth && p.year === currentYear);
      if (!payment) {
        payment = { month: selectedMonth, year: currentYear, receivable: tenant.rent, paid: 0, status: 'Due' };
        tenant.payments.push(payment);
      }
      payment.paid = payment.receivable;
      payment.status = 'Complete';
      updateSummaryCard();
      updateRentHistoryTable(currentYear);
    });

    // Export JSON
    document.getElementById('exportJsonBtn').addEventListener('click', () => {
      const tenant = tenants.find(t => t.id === selectedTenantId);
      const dataStr = JSON.stringify(tenant, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tenant.name}_data.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    // Generate Invoice PDF
    document.getElementById('invoicePdfBtn').addEventListener('click', () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const tenant = tenants.find(t => t.id === selectedTenantId);
      doc.setFontSize(16);
      doc.text('ভাড়া ম্যানেজার - ইনভয়েস', 20, 20);
      doc.setFontSize(12);
      doc.text(`নাম: ${tenant.name}`, 20, 30);
      doc.text(`ঠিকানা: ${tenant.address}`, 20, 40);
      doc.text(`মাসিক ভাড়া: ৳${tenant.rent.toLocaleString('bn')}`, 20, 50);
      doc.text(`তারিখ: ${new Date().toLocaleString('bn')}`, 20, 60);
      doc.save(`${tenant.name}_invoice.pdf`);
    });

    // Edit Payment Modal
    document.getElementById('editPaymentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const tenant = tenants.find(t => t.id === selectedTenantId);
      let payment = tenant.payments.find(p => p.month === selectedMonth && p.year === currentYear);
      if (!payment) {
        payment = { month: selectedMonth, year: currentYear, receivable: tenant.rent, paid: 0, status: 'Due' };
        tenant.payments.push(payment);
      }
      payment.paid = parseInt(formData.get('paid'));
      payment.status = payment.paid === payment.receivable ? 'Complete' : payment.paid > 0 ? 'Partial' : 'Due';
      updateSummaryCard();
      updateRentHistoryTable(currentYear);
      document.getElementById('editPaymentModal').style.display = 'none';
    });

    // Year Navigation
    document.getElementById('prevYearBtn').addEventListener('click', () => {
      currentYear--;
      document.getElementById('currentYear').textContent = currentYear.toString();
      updateRentHistoryTable(currentYear);
      updateSummaryCard(); // Update summary if selected month is still valid
    });

    document.getElementById('nextYearBtn').addEventListener('click', () => {
      currentYear++;
      document.getElementById('currentYear').textContent = currentYear.toString();
      updateRentHistoryTable(currentYear);
      updateSummaryCard();
    });

    // Close Modals
    document.querySelectorAll('.closeModal').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
      });
    });

    // Helper Functions
    function updateProfileCard() {
      const tenant = tenants.find(t => t.id === selectedTenantId);
      document.querySelector('[data-field="name"]').textContent = tenant.name;
      document.querySelector('[data-field="phone"]').textContent = tenant.phone || 'N/A';
      document.querySelector('[data-field="address"]').textContent = tenant.address;
      document.querySelector('[data-field="rent"]').textContent = `৳${tenant.rent.toLocaleString('bn')}`;
      document.querySelector('[data-field="startDate"]').textContent = tenant.startDate;
      document.querySelector('[data-field="status"]').textContent = tenant.status;
      document.querySelector('[data-field="status"]').className = `inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${tenant.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`;
    }

    function updateFamilyCard() {
      const tenant = tenants.find(t => t.id === selectedTenantId);
      const familyList = document.getElementById('familyList');
      familyList.innerHTML = tenant.family.map(member => `
        <div class="rounded-xl border border-slate-200 p-4">
          <div class="text-sm text-slate-500">নাম</div>
          <div class="font-semibold">${member.name}</div>
          <div class="text-xs text-slate-500">সম্পর্ক: ${member.relation} • বয়স: ${member.age}</div>
        </div>
      `).join('');
    }

    function updateSummaryCard() {
      const tenant = tenants.find(t => t.id === selectedTenantId);
      const payment = tenant.payments.find(p => p.month === selectedMonth && p.year === currentYear) || { receivable: tenant.rent, paid: 0 };
      const due = payment.receivable - payment.paid;
      document.getElementById('summaryHeader').textContent = `সারাংশ (${selectedMonth})`;
      document.querySelector('[data-field="receivable"]').textContent = `৳${payment.receivable.toLocaleString('bn')}`;
      document.querySelector('[data-field="paid"]').textContent = `৳${payment.paid.toLocaleString('bn')}`;
      document.querySelector('[data-field="due"]').textContent = `৳${due.toLocaleString('bn')}`;
    }

    function updateRentHistoryTable(year) {
      const tenant = tenants.find(t => t.id === selectedTenantId);
      const tableBody = document.getElementById('rentHistoryTable');
      tableBody.innerHTML = months.map(month => {
        let payment = tenant.payments.find(p => p.month === month && p.year === year) || { receivable: tenant.rent, paid: 0, status: 'Due' };
        return `
          <tr data-month="${month}">
            <td class="px-4 py-2">${month}</td>
            <td class="px-4 py-2">৳${payment.receivable.toLocaleString('bn')}</td>
            <td class="px-4 py-2">৳${payment.paid.toLocaleString('bn')}</td>
            <td class="px-4 py-2"><span class="rounded-full px-3 py-1 text-xs font-semibold ${payment.status === 'Complete' ? 'bg-green-100 text-green-700' : payment.status === 'Partial' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-700'}">${payment.status}</span></td>
            <td class="px-4 py-2 text-right"><button class="viewEditBtn rounded-lg border border-slate-200 px-2 py-1 text-xs hover:bg-slate-50" data-month="${month}" aria-label="${month} ভিউ এবং এডিট">ভিউ/এডিট</button></td>
          </tr>
        `;
      }).join('');
      document.querySelectorAll('.viewEditBtn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedMonth = btn.dataset.month;
          updateSummaryCard();
          const payment = tenant.payments.find(p => p.month === selectedMonth && p.year === year) || { receivable: tenant.rent, paid: 0 };
          const form = document.getElementById('editPaymentForm');
          document.getElementById('editPaymentHeader').textContent = `পেমেন্ট এডিট (${selectedMonth})`;
          form.receivable.value = payment.receivable;
          form.paid.value = payment.paid;
          document.getElementById('editPaymentModal').style.display = 'flex';
        });
      });
    }

    function updateTenantList() {
      const tenantList = document.getElementById('tenantList');
      tenantList.innerHTML = tenants.map(t => `
        <a class="group flex items-center justify-between rounded-xl px-2 py-2 hover:bg-white/10" data-tenant-id="${t.id}">
          <div>
            <div class="text-sm font-semibold">${t.name}</div>
            <div class="text-xs text-white/70">৳${t.rent.toLocaleString('bn')} • ${t.address}</div>
          </div>
          <span class="rounded-md bg-${t.status === 'Active' ? 'green' : 'yellow'}-500/20 px-2 text-[10px] font-semibold text-${t.status === 'Active' ? 'green' : 'yellow'}-200">${t.status}</span>
        </a>
      `).join('');
      document.querySelectorAll('#tenantList a.group').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          selectedTenantId = parseInt(item.dataset.tenantId);
          updateProfileCard();
          updateFamilyCard();
          updateRentHistoryTable(currentYear);
          updateSummaryCard();
        });
      });
    }

    // Initialize
    updateProfileCard();
    updateFamilyCard();
    updateRentHistoryTable(currentYear);
    updateSummaryCard();

document.addEventListener('DOMContentLoaded', function() {
  fetchMemberData();

  const editButton = document.getElementById('editButton');
  const updateForm = document.getElementById('updateForm');
  const updateMemberForm = document.getElementById('updateMemberForm');

  editButton.addEventListener('click', function() {
    updateForm.style.display = 'block';
    populateUpdateForm();
  });

  updateMemberForm.addEventListener('submit', function(event) {
    event.preventDefault();
    updateMemberData();
  });
});

function fetchMemberData() {
  // 模擬從資料庫獲取會員資料
  const memberData = {
    phone: '0912345678',
    email: 'example@example.com',
    fullName: '王小明',
    gender: '男',
    dob: '1990-01-01',
    altPhone: '0923456789',
    address: '台北市信義區',
    agree: true
  };

  displayMemberData(memberData);
}

function displayMemberData(data) {
  const memberDetails = document.getElementById('memberDetails');
  memberDetails.innerHTML = `
    <p><strong>手機號碼:</strong> ${data.phone}</p>
    <p><strong>電子郵件:</strong> ${data.email}</p>
    <p><strong>真實姓名:</strong> ${data.fullName}</p>
    <p><strong>性別:</strong> ${data.gender}</p>
    <p><strong>生日:</strong> ${data.dob}</p>
    <p><strong>其他聯絡電話:</strong> ${data.altPhone}</p>
    <p><strong>地址:</strong> ${data.address}</p>
    <p><strong>同意條款:</strong> ${data.agree ? '是' : '否'}</p>
  `;
}

function populateUpdateForm() {
  // 模擬從資料庫獲取會員資料
  const memberData = {
    phone: '0912345678',
    email: 'example@example.com',
    fullName: '王小明',
    gender: '男',
    dob: '1990-01-01',
    altPhone: '0923456789',
    address: '台北市信義區'
  };

  document.getElementById('phone').value = memberData.phone;
  document.getElementById('email').value = memberData.email;
  document.getElementById('fullName').value = memberData.fullName;
  document.getElementById('gender').value = memberData.gender;
  document.getElementById('dob').value = memberData.dob;
  document.getElementById('altPhone').value = memberData.altPhone;
  document.getElementById('address').value = memberData.address;
}

function updateMemberData() {
  const updatedData = {
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    fullName: document.getElementById('fullName').value,
    gender: document.getElementById('gender').value,
    dob: document.getElementById('dob').value,
    altPhone: document.getElementById('altPhone').value,
    address: document.getElementById('address').value
  };

  // 這裡應該發送一個請求到伺服器端來更新資料庫中的會員資料
  console.log('更新的會員資料:', updatedData);
  alert('會員資料更新成功');

  // 更新成功後，重新顯示會員資料
  displayMemberData(updatedData);
  document.getElementById('updateForm').style.display = 'none';
}

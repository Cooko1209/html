document.addEventListener('DOMContentLoaded', function() {
  const sendCodeBtn = document.getElementById('sendCodeBtn');
  const phoneInput = document.getElementById('phone');

  sendCodeBtn.addEventListener('click', function() {
    const phone = phoneInput.value;
    if (phone) {
      alert('驗證碼已發送至 ' + phone);
      sendCodeBtn.disabled = true;
      sendCodeBtn.textContent = '已發送驗證碼';
    } else {
      alert('請輸入手機號碼');
    }
  });
});

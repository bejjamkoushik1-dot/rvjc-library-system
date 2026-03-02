/**
 * Reserve modal: calendar/date picker to choose return date. No prompt/alert.
 * Expects in DOM: #reserve-modal, with .reserve-modal-box, #reserve-modal-date,
 * #reserve-modal-error, #reserve-modal-cancel, #reserve-modal-submit
 */
(function() {
  function el(id) { return document.getElementById(id); }
  function todayStr() { return new Date().toISOString().slice(0, 10); }
  function addDays(d, n) {
    var x = new Date(d);
    x.setDate(x.getDate() + n);
    return x.toISOString().slice(0, 10);
  }

  window.showReserveModal = function(bookId, callbacks) {
    callbacks = callbacks || {};
    var onSuccess = callbacks.onSuccess || function() {};
    var onClose = callbacks.onClose || function() {};
    var modal = el('reserve-modal');
    var dateInput = el('reserve-modal-date');
    var errEl = el('reserve-modal-error');
    var cancelBtn = el('reserve-modal-cancel');
    var submitBtn = el('reserve-modal-submit');
    if (!modal || !dateInput) return;

    var tomorrow = addDays(new Date(), 1);
    var maxDate = addDays(new Date(), 60);
    dateInput.min = tomorrow;
    dateInput.max = maxDate;
    dateInput.value = addDays(new Date(), 14);
    if (errEl) { errEl.textContent = ''; errEl.classList.add('hidden'); }
    modal.classList.remove('hidden');

    function close() {
      modal.classList.add('hidden');
      onClose();
    }

    cancelBtn.onclick = close;
    var closeBtn = el('reserve-modal-close');
    if (closeBtn) closeBtn.onclick = close;
    modal.onclick = function(e) {
      if (e.target === modal) close();
    };

    submitBtn.onclick = function() {
      var raw = dateInput.value;
      if (!raw) {
        if (errEl) { errEl.textContent = 'Please pick a return date.'; errEl.classList.remove('hidden'); }
        return;
      }
      var selected = new Date(raw + 'T12:00:00');
      var start = new Date(todayStr() + 'T12:00:00');
      var days = Math.ceil((selected - start) / (24 * 60 * 60 * 1000));
      if (days < 1 || days > 60) {
        if (errEl) { errEl.textContent = 'Please choose a date between 1 and 60 days from today.'; errEl.classList.remove('hidden'); }
        return;
      }
      submitBtn.disabled = true;
      if (errEl) { errEl.textContent = ''; errEl.classList.add('hidden'); }
      fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: parseInt(bookId, 10), days: days }),
        credentials: 'include'
      })
        .then(function(r) { return r.json().then(function(data) { return { ok: r.ok, data: data }; }); })
        .then(function(result) {
          submitBtn.disabled = false;
          if (result.ok) {
            close();
            onSuccess(result.data);
          } else {
            if (errEl) {
              errEl.textContent = result.data.error || 'Could not reserve.';
              errEl.classList.remove('hidden');
            }
          }
        })
        .catch(function() {
          submitBtn.disabled = false;
          if (errEl) {
            errEl.textContent = 'Something went wrong. Please try again.';
            errEl.classList.remove('hidden');
          }
        });
    };
  };
})();

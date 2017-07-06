angular.module('echo.constants.invoices', [])
  .constant('invoiceConstants', {
    STATUSES: {
      PENDING: {
        value: 0,
        description: 'Submitted'
      },
      SUBMITTED: {
        value: 1,
        description: 'Submitted'
      },
      IN_REVIEW: {
        value: 2,
        description: 'In Review'
      },
      APPROVED: {
        value: 3,
        description: 'Approved'
      },
      POSTED: {
        value: 4,
        description: 'Posted'
      },
      PAID: {
        value: 5,
        description: 'Paid'
      },
      VOID: {
        value: 6,
        description: 'Void'
      }
    },
    STATUS_REASONS: {
      WEIGHT_DISCREPANCY: {
        value: 0,
        description: 'Weight Discrepancy'
      }
    }
  });

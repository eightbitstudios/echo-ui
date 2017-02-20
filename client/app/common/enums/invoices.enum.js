angular.module('echo.enums.invoices', [])
  .constant('invoiceEnums', {
    STATUSES: {
      IN_REVIEW: {
        value: 0,
        description: 'In Review'
      },
      REJECTED: {
        value: 1,
        description: 'Rejected'
      },
      SUBMITTED: {
        value: 2,
        description: 'Submitted'
      },
      APPROVED: {
        value: 3,
        description: 'Approved'
      },
      PAID: {
        value: 4,
        description: 'Paid'
      }
    },
    STATUS_REASONS: {
      WEIGHT_DISCREPANCY: {
        value: 0,
        description: 'Weight Discrepancy'
      }
    }
  });

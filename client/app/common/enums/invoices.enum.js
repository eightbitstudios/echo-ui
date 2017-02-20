angular.module('echo.enums.invoices', [])
  .constant('invoiceEnums', {
    STATUSES: {
      IN_REVIEW: {
        value: 0,
        description: 'In Review'
      },
      SUBMITTED: {
        value: 1,
        description: 'Submitted'
      },
      APPROVED: {
        value: 2,
        description: 'Approved'
      },
      VOID: {
        value: 3,
        description: 'Void'
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

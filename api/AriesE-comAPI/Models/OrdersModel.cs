using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AriesE_comAPI.Models
{
    public class OrdersModel
    {
        public Nullable<System.DateTime> OrderPlacedDate { get; set; }
        public int OrderID { get; set; }
        public Nullable<int> ProductID { get; set; }
        public string ProductName { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public int Quantity { get; set; }
        public Nullable<decimal> ShippingCost { get; set; }
        public Nullable<decimal> TotalCost { get; set; }
        public string OrderStatus { get; set; }
        public Nullable<int> DistributerID { get; set; }
    }
}
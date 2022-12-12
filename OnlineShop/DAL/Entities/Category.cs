﻿namespace OnlineShop.DAL.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public int? ParentCategoryId { get; set; }

        public virtual Category? ParentCategory { get; set; }
    }
}

## Getting Started

App running FE and has some function on BE to mimic logic. Includes redis

Run app:

```bash
cd docker
doccker-compose up -d
cd ..
npm run dev
# or
yarn dev
```


# Requirements for BE:

## Tech stack

 - Node.js version > 12
 - Docker
 - Unit tests (jest)
 - ORM for DB
 - Postgresql
 - Typescript
 - Stripe
 - JWT

## Entities
 - User
 - Order
 - Product
 - Modifier
 - Label
 - Category
 - Credit Card
 - Transaction


### User
Must be of type customer or admin. 
Only admin can create Products, Modifiers or Categories.

User can have multiple orders and multiple Credit Cards. 

User can add Product to his Order and Pay it with Card.
Admin can edit status of Order from "Order received" status to "Processing" and then to "Ready"

User can view his previously paid orders

User can be authorized in system and log into it.

### Product
Must contain fields: name, price, image, description
Also he can have modifiers which could be either applied or not, labels that can indicate something. 

Order can have multiple products of same type. 
Order can be paid by credit card

### Label
Must contain fields: name, image
Can be bound to some products.

### Category
Must contain field: name
Can be applied to some products.

### Modifier
Must contain field: name, price
Can be applied to product while adding to order. Modifies product price.

 
### Credit card
Can be added via frontend form to certain customer.
Will have fields external_id, user_id


### Transaction
Will represent the charge created for some order. Can be refunded by admin. Or by cancelling order by customer.



"""Add user_metadata to Order and Subscription

Revision ID: ebc55e7c3d7d
Revises: b48947c6b083
Create Date: 2024-11-05 13:52:41.587080

"""

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# Polar Custom Imports

# revision identifiers, used by Alembic.
revision = "ebc55e7c3d7d"
down_revision = "b48947c6b083"
branch_labels: tuple[str] | None = None
depends_on: tuple[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "orders",
        sa.Column(
            "custom_field_data", postgresql.JSONB(astext_type=sa.Text()), nullable=True
        ),
    )
    op.execute(
        "UPDATE orders SET custom_field_data = '{}' WHERE custom_field_data IS NULL"
    )
    op.alter_column("orders", "custom_field_data", nullable=False)

    op.add_column(
        "subscriptions",
        sa.Column(
            "custom_field_data", postgresql.JSONB(astext_type=sa.Text()), nullable=True
        ),
    )
    op.execute(
        "UPDATE subscriptions SET custom_field_data = '{}' WHERE custom_field_data IS NULL"
    )
    op.alter_column("subscriptions", "custom_field_data", nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("subscriptions", "custom_field_data")
    op.drop_column("orders", "custom_field_data")
    # ### end Alembic commands ###

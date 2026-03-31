use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, m: &SchemaManager) -> Result<(), DbErr> {
        m.create_table(
            Table::create()
                .table(Buddies::Table)
                .if_not_exists()
                .col(
                    ColumnDef::new(Buddies::Id)
                        .integer()
                        .not_null()
                        .auto_increment()
                        .primary_key(),
                )
                .col(ColumnDef::new(Buddies::Status).string())
                .col(ColumnDef::new(Buddies::User1).integer().not_null())
                .col(ColumnDef::new(Buddies::User2).integer().not_null())
                .foreign_key(
                    ForeignKey::create()
                        .name("fk_buddies_user_1")
                        .from(Buddies::Table, Buddies::User1)
                        .to(Users::Table, Users::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                        .on_update(ForeignKeyAction::Cascade),
                )
                .foreign_key(
                    ForeignKey::create()
                        .name("fk_buddies_user_2")
                        .from(Buddies::Table, Buddies::User2)
                        .to(Users::Table, Users::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                        .on_update(ForeignKeyAction::Cascade),
                )
                .to_owned(),
        )
            .await
    }

    async fn down(&self, m: &SchemaManager) -> Result<(), DbErr> {
        m.drop_table(Table::drop().table(Buddies::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Buddies {
    Table,
    Id,
    Status,
    User1,
    User2,
}

#[derive(DeriveIden)]
enum Users {
    Table,
    Id,
}
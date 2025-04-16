
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fund',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scheme_name', models.CharField(max_length=255)),
                ('amc', models.CharField(max_length=255)),
                ('scheme_code', models.CharField(max_length=50, unique=True)),
                ('nav', models.DecimalField(decimal_places=4, max_digits=12)),
                ('category', models.CharField(choices=[('Equity', 'Equity'), ('Debt', 'Debt'), ('Hybrid', 'Hybrid'), ('Solution Oriented', 'Solution Oriented'), ('Other', 'Other')], default='Other', max_length=50)),
                ('sub_category', models.CharField(blank=True, max_length=100, null=True)),
                ('expense_ratio', models.DecimalField(decimal_places=2, max_digits=5)),
                ('aum', models.DecimalField(decimal_places=2, max_digits=14)),
                ('aum_category', models.CharField(choices=[('Small', 'Small'), ('Mid', 'Mid'), ('Large', 'Large')], default='Small', max_length=10)),
                ('risk_rating', models.IntegerField(choices=[(1, 'Low'), (2, 'Moderate Low'), (3, 'Moderate'), (4, 'Moderate High'), (5, 'High')], default=3)),
                ('inception_date', models.DateField()),
                ('fund_manager', models.CharField(blank=True, max_length=255, null=True)),
                ('min_sip_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('min_lumpsum', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('exit_load', models.CharField(blank=True, max_length=255, null=True)),
                ('standard_deviation', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('sharpe_ratio', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('treynor_ratio', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('beta', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('alpha', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('cagr', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('max_drawdown', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
            ],
            options={
                'ordering': ['scheme_name'],
            },
        ),
        migrations.CreateModel(
            name='DataProvider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('api_key', models.CharField(max_length=255)),
                ('base_url', models.URLField()),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='FundReturn',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('period', models.CharField(max_length=10)),
                ('value', models.DecimalField(decimal_places=2, max_digits=8)),
                ('as_of_date', models.DateField()),
                ('fund', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='returns_data', to='funds.fund')),
            ],
            options={
                'unique_together': {('fund', 'period')},
            },
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-05-15 04:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields
import v1.blocks
import v1.models.snippets
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0156_sublandingpage_portal_topic'),
        ('ask_cfpb', '0027_portalsearchpage'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('text', models.CharField(max_length=255)),
                ('url', models.CharField(max_length=255)),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ArticlePage',
            fields=[
                ('cfgovpage_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='v1.CFGOVPage')),
                ('category', models.CharField(choices=[('basics', 'Basics'), ('common_issues', 'Common issues'), ('howto', 'How to'), ('know_your_rights', 'Know your rights')], max_length=255)),
                ('heading', models.CharField(blank=True, max_length=255)),
                ('intro', models.TextField(blank=True)),
                ('inset_heading', models.CharField(blank=True, max_length=255, verbose_name='Heading')),
                ('sections', wagtail.wagtailcore.fields.StreamField([('section', wagtail.wagtailcore.blocks.StructBlock([('heading', wagtail.wagtailcore.blocks.CharBlock(label='Section heading', max_length=255, required=True)), ('summary', wagtail.wagtailcore.blocks.TextBlock(blank=True, label='Section summary', required=False)), ('link_text', wagtail.wagtailcore.blocks.CharBlock(blank=True, label='Section link text', required=False)), ('url', wagtail.wagtailcore.blocks.CharBlock(blank=True, label='Section link URL', max_length=255, required=False)), ('subsections', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock([('heading', wagtail.wagtailcore.blocks.CharBlock(blank=True, label='Subsection heading', max_length=255, required=False)), ('summary', wagtail.wagtailcore.blocks.TextBlock(blank=True, label='Subsection summary', required=False)), ('link_text', wagtail.wagtailcore.blocks.CharBlock(label='Subsection link text', required=True)), ('url', wagtail.wagtailcore.blocks.CharBlock(label='Subsection link URL', required=True))])))]))])),
                ('sidebar', wagtail.wagtailcore.fields.StreamField([('call_to_action', wagtail.wagtailcore.blocks.StructBlock([(b'slug_text', wagtail.wagtailcore.blocks.CharBlock(required=False)), (b'paragraph_text', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), (b'button', wagtail.wagtailcore.blocks.StructBlock([(b'text', wagtail.wagtailcore.blocks.CharBlock(required=False)), (b'url', wagtail.wagtailcore.blocks.CharBlock(default=b'/', required=False)), (b'size', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'regular', b'Regular'), (b'large', b'Large Primary')]))]))])), ('related_links', wagtail.wagtailcore.blocks.StructBlock([(b'heading', wagtail.wagtailcore.blocks.CharBlock(required=False)), (b'paragraph', wagtail.wagtailcore.blocks.RichTextBlock(required=False)), (b'links', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock([(b'text', wagtail.wagtailcore.blocks.CharBlock(required=False)), (b'url', wagtail.wagtailcore.blocks.CharBlock(default=b'/', required=False))])))])), ('related_metadata', wagtail.wagtailcore.blocks.StructBlock([(b'slug', wagtail.wagtailcore.blocks.CharBlock(max_length=100)), (b'content', wagtail.wagtailcore.blocks.StreamBlock([(b'text', wagtail.wagtailcore.blocks.StructBlock([(b'heading', wagtail.wagtailcore.blocks.CharBlock(max_length=100)), (b'blob', wagtail.wagtailcore.blocks.RichTextBlock())], icon=b'pilcrow')), (b'list', wagtail.wagtailcore.blocks.StructBlock([(b'heading', wagtail.wagtailcore.blocks.CharBlock(max_length=100)), (b'links', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock([(b'text', wagtail.wagtailcore.blocks.CharBlock(required=False)), (b'url', wagtail.wagtailcore.blocks.CharBlock(default=b'/', required=False))])))], icon=b'list-ul')), (b'date', wagtail.wagtailcore.blocks.StructBlock([(b'heading', wagtail.wagtailcore.blocks.CharBlock(max_length=100)), (b'date', wagtail.wagtailcore.blocks.DateBlock())], icon=b'date')), (b'topics', wagtail.wagtailcore.blocks.StructBlock([(b'heading', wagtail.wagtailcore.blocks.CharBlock(default=b'Topics', max_length=100)), (b'show_topics', wagtail.wagtailcore.blocks.BooleanBlock(default=True, required=False))], icon=b'tag'))])), (b'is_half_width', wagtail.wagtailcore.blocks.BooleanBlock(default=False, required=False))])), ('email_signup', wagtail.wagtailcore.blocks.StructBlock([(b'heading', wagtail.wagtailcore.blocks.CharBlock(default=b'Stay informed', required=False)), (b'default_heading', wagtail.wagtailcore.blocks.BooleanBlock(default=True, help_text=b'If selected, heading will be styled as an H5 with green top rule. Deselect to style header as H3.', label=b'Default heading style', required=False)), (b'text', wagtail.wagtailcore.blocks.CharBlock(help_text=b'Write a sentence or two about what kinds of emails the user is signing up for, how frequently they will be sent, etc.', required=False)), (b'gd_code', wagtail.wagtailcore.blocks.CharBlock(help_text=b'Code for the topic (i.e., mailing list) you want people who submit this form to subscribe to. Format: USCFPB_###', label=b'GovDelivery code', required=False)), (b'disclaimer_page', wagtail.wagtailcore.blocks.PageChooserBlock(help_text=b'Choose the page that the "See Privacy Act statement" link should go to. If in doubt, use "Generic Email Sign-Up Privacy Act Statement".', label=b'Privacy Act statement', required=False))])), ('reusable_text', v1.blocks.ReusableTextChooserBlock(v1.models.snippets.ReusableText))], blank=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('v1.cfgovpage',),
        ),
        migrations.AddField(
            model_name='articlelink',
            name='article_page',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='article_links', to='ask_cfpb.ArticlePage'),
        ),
    ]
